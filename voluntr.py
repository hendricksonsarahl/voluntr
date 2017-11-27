from flask import Flask, request, redirect, render_template, flash, url_for, json, make_response
from app import app, db
from models.org import Organization, Opportunity
from csvdata.orgcsv import add_orgs
from csvdata.oppscsv import add_opportunities
from filters import Filters
import datetime, os
from helpers.datetime_helpers import *
from helpers.opp_validation import *
from helpers.oauth_helpers import *
from helpers.category_helpers import *
from helpers.state_names import *
from helpers.query_helpers import *
from helpers.opp_search_helpers import *

is_production = 'IS_PRODUCTION' in os.environ

# Voluntr landing page - accessed at localhost:5000 for now
@app.route("/", methods=['GET'])
def index():
    ''' displays a landing page that invites the user to interact 
    with the app as either a individual volunteer or an organization/non-profit 
    representative '''
    return render_template('index.html', title="Voluntr", is_production=is_production)


@app.route("/filters", methods=['GET', 'POST'])
def set_filters():
    '''displays a form for volunteers to select their interests and availability'''

    if request.method == 'POST':

        cat = process_category(request.form) 
        avail = process_availability(request.form)
        zipcode = process_zipcode(request.form)
        distance = process_distance(request.form)

        resp = make_response(redirect("/opportunities")) # tells the cookie to redirect to /opp after setting cookie
        resp.set_cookie('filters', str("0/" + cat + "/" + avail + "/" + zipcode + "/" + distance )) # prepares cookie to be set with index of zero
        
        return resp # sets cookie and redirects

    categories = get_categories()

    return render_template('volunteer/filters.html', title="Voluntr | Filters", categories = categories, is_production=is_production)


@app.route("/opportunities", methods=['GET'])
def opportunities():
    '''display search results to volunteer'''

    if 'filters' in request.cookies:

        cookie = (request.cookies.get('filters')) #grabs cookie
        filters = cookie.split("/") # splits cookie into list

        index = int(filters[0]) # grabs index from list
        cat = filters[1] # grabs categories from list
        categories = cat.split("-")
        avail = filters[2] # grabs available days
        availability = avail.split("-") # splits into list
        zipcode = filters[3] #grabs zipcode from list
        distance = filters[4] #grabs distance from list

        search = Filters(categories=categories, availability=availability, zipcode=zipcode, distance=distance) # creates filter with given category and availability
        opps = search.search() #grabs list of opportunities

        error = check_opps(opps)
        if error:
            flash(error)
            return redirect('/filters')

        opp = opps[index] # picks out the opp at index
        index = increment(index, len(opps)) # increments index
        
        event_date = readable_date(opp.startDateTime)
        event_time = readable_times(opp.startDateTime, opp.duration)

        resp = make_response(render_template('volunteer/opportunities.html', 
                                            opp=opp, event_date = event_date, event_time=event_time, 
                                            json=json, title="Voluntr | Browse Opportunities",is_production=is_production)
                                            ) # tells the cookie what to load while it sets itself

        resp.set_cookie('filters', str(index) + "/" + cat + "/" + avail + "/" + zipcode + "/" + distance ) #preps cookie for setting

        return resp # sets cookie and displays page
    
    return redirect("/filters") # redirects to filters if no cookie exists


@app.route("/matches", methods=['GET'])
def display_matches():
    '''lists all opportunities that a volunteer user saved'''
    return render_template('volunteer/matches.html', title="Voluntr | Saved Opportunities", is_production=is_production)

@app.route("/match", methods=['POST'])
def display_match():
    """displays a single oppotunity that the user saved"""

    oppId = request.form['oppId']
    opp = get_opp_by_id(oppId)
    event_date = readable_date(opp.startDateTime)
    event_time = readable_times(opp.startDateTime, opp.duration)
    return render_template('volunteer/single_opp.html', title="Voluntr | Saved Opportunity", 
                                opp=opp, event_date = event_date, event_time=event_time, is_production=is_production)

@app.route("/org/login", methods=['GET'])
def org_login():
    '''displays a form for organizations to signup or login to Voluntr'''
    return render_template('organization/login.html', title="Voluntr | Log In", is_production=is_production)
        
@app.route("/org/login", methods=['POST'])
def login():

    '''process a login attempt via OAuth token, return JSON'''

    token = request.get_json()["authToken"]

    # Start building a response
    response_content = {"token": token}

    # Check the validity of the OAuth token:
    userid = process_oauth_token(token)

    if (userid):
        response_content["valid_token"] = True

        # If the token is valid, see if the ID corresponds to an existing Voluntr account
        org_account = Organization.query.filter_by(userid=userid).first()

        if (org_account):
            response_content["account_exists"] = True

        else:
            response_content["account_exists"] = False

    else:
        response_content["valid_token"] = False

    return json.jsonify(response_content)
    

@app.route("/org/signup", methods=['POST'])
def signup():
    '''process a sign-up attempt with an Oauth token and some form data'''

    token = request.form['token']
    orgName = request.form['orgName']
    email = request.form['email']
    url = request.form['url']
    contactName = request.form['contactName']

    # call process_oauth_token to convert token to google id
    userid = process_oauth_token(token)


    # retrieve the user data from the database 
    user = Organization.query.filter_by(id=userid).first()
    
    # if userid not in database, create new user
    if not (user):

        new_user = Organization(userid=userid, email=email, orgName=orgName, contactName=contactName, url=url)
        db.session.add(new_user)
        db.session.commit()
    
    # redirect user to logged-in view, and set cookie with OAuth token:
    resp = make_response(redirect("/org/opportunities"))
    resp.set_cookie('token', token)
    return resp


@app.route("/org/opportunities", methods=['GET'])
def manage_opportunities():
    '''displays all volunteer opportunities associated with an organization, with options to create
     new opportunities, or view an individual opportunity'''

    if 'token' in request.cookies:

        org = process_org_token(request.cookies.get('token'))

        # define variables to pass into the template
        org_name = org.orgName

        # check for deleted opportunities:
        opp_id = request.args.get("del")
        if opp_id:
            hide_opp = get_opp_by_id(opp_id)
            hide_opp.display = False
            if validate_opp_data() == True:
                db.session.commit()

        # display all active opportunities on the org homepage
        opps = db.session.query(Opportunity).filter_by(owner_id = org.userid, display = 1).all()
        
        # format datetime into more readable strings
        for opp in opps:
            opp.startDateTime = readable_date(opp.startDateTime)
        
        return render_template('organization/opportunities.html', title='Voluntr | Opportunities', headerName = org_name, opportunities = opps, is_production=is_production)
    # just in case cookie isn't there for some reason
    # this should probably lead to an error page, or at least somewhere else.. so i just did this instead
    return  redirect("/")

@app.route("/org/add", methods=['GET', 'POST'])
def new_opportunity():
    '''displays a form for organizations to add a new volunteer opportunity'''
    
    if request.method == 'POST':
        # get all form data
        title = validate_title(request.form["title"])
        address = request.form["address"]
        city = request.form["city"]
        state = request.form["state"]
        zip_code = request.form["zipcode"]
        category_class = request.form["category"]
        category = get_category(category_class)
        description = validate_description(request.form["description"])
        next_steps = validate_next_steps(request.form["nextSteps"])

        # Either get the form's date/times, or add the date/times we've chosen to signify "flexible schedule"
        if request.form.get("flexible"):
            date = "2100-01-01"
            start_time = "23:30"
            end_time = "23:30"
        else:
            date = request.form["date"]
            start_time = request.form["startTime"]
            end_time = request.form["endTime"]
        
        # format dateStartTime
        start_date_time = create_datetime(date, start_time)

        # get duration as an int
        duration = get_duration(start_time, end_time)

        # user is obtained by taking an ouath token from a cookie and using a function that grabs the id and queries th DB
        org = process_org_token(request.cookies.get('token'))

        # TODO: server-side validation will be added here soon. 
        if validate_opp_data():
            # save new, opportunity to db.
            new_opp = Opportunity(title, address, city, 
                                    state, zip_code, description,
                                    start_date_time, duration, 
                                    category_class, category, 
                                    next_steps, org.userid)

            db.session.add(new_opp)
            db.session.commit()

            return redirect('/org/opportunities')
    
    # response for GET requests:
    categories = get_categories()
    states = get_states()

    return render_template('organization/add.html', title='Voluntr | Add Opportunity', categories = categories, states = states, is_production=is_production)
  

@app.route("/org/profile", methods=['GET', 'POST'])
def view_profile():
    ''' displays a form pre-populated with data about the organization account'''
    
    if request.method == 'POST':
        
        org = process_org_token(request.cookies.get('token'))

        # update org data with form data
        org.contactName = request.form["contactName"]
        org.email = request.form["email"]
        org.orgName = request.form["orgName"]
        org.url = request.form["url"]

        # TODO: server-side validation will be added here soon. 
        if validate_org_data() == True:
            # save updated opportunity to db.
            db.session.commit()

            return redirect('/org/opportunities')

    org = process_org_token(request.cookies.get('token'))

    return render_template('organization/profile.html', org=org, title='Voluntr | Account Profile', is_production=is_production)

   
@app.route("/org/edit", methods=['GET', 'POST'])
def edit_opportunity():
    ''' displays a form pre-populated with data for a single opportunity, so the user can 
    either edit individual fields and repost the opportunity, or remove the opportunity 
    from the app '''


    if request.method == "POST":
            
        id = request.args.get("id", type=int)
        opp = get_opp_by_id(id)
        
        # use form data to update opportunity
        opp.title = validate_title(request.form["title"])
        opp.address = request.form["address"]
        opp.city = request.form["city"]
        opp.state = request.form["state"]
        opp.zipcode = request.form["zipcode"]
        opp.description = validate_description(request.form["description"])
        
        # Either get the form's date/times, or add the date/times we've chosen to signify "flexible schedule"
        if request.form.get("flexible"):
            date = "2100-01-01"
            start_time = "23:30"
            end_time = "23:30"
        else:
            date = request.form["date"]
            start_time = request.form["startTime"]
            end_time = request.form["endTime"]

        # format dateStartTime and duration
        opp.startDateTime = create_datetime(date, start_time)
        opp.duration = get_duration(start_time, end_time)
        
        opp.category_class = request.form["category"]
        opp.category = get_category(request.form["category"])
        opp.nextSteps = validate_next_steps(request.form["nextSteps"])    
        
        # TODO: add real validation steps here 
        if validate_opp_data() == True:
            # update db with new form information
            db.session.commit()
            return redirect('/org/opportunities')
    
    # for GET requests:
        
    id = request.args.get("id", type=int)
    opp = get_opp_by_id(id)
    event_date = opp.startDateTime.strftime('%Y-%m-%d')
    time_start = get_start_time(opp.startDateTime)
    time_end = get_end_time(opp.startDateTime, opp.duration)  
    categories = get_categories()
    states = get_states()
    return render_template('organization/edit.html', title='Voluntr | Edit Opportunity', opp=opp, 
                                event_date = event_date, time_start = time_start, time_end = time_end,
                                categories=categories, states=states, is_production=is_production)


@app.route("/org/opportunity", methods=['GET'])
def show_opportunity():
    '''displays details about a specific volunteer opportunity''' 
    id = request.args.get("id", type=int)
    opp = get_opp_by_id(id) 
    event_date = readable_date(opp.startDateTime)
    event_time = readable_times(opp.startDateTime, opp.duration)
    return render_template('organization/preview.html', title="Voluntr | Preview Post", opp=opp, 
                                event_date = event_date, event_time = event_time, is_production=is_production)


# Run this route upon app startup to load sample data
@app.route("/drop_create", methods=['GET'])
def dropCreate():
    # disable this route for production environment
    if not is_production:
        db.drop_all()
        db.create_all()
        add_orgs()
        add_opportunities()
    
    return redirect('/')

# runs the app, always the last line
if __name__ == '__main__':
    app.run(threaded = True)
