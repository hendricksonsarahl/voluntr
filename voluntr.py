from flask import Flask, request, redirect, render_template, flash, url_for, json, make_response
from app import app, db
from models.org import Organization, Opportunity
from csvdata.orgcsv import add_orgs
from csvdata.oppscsv import add_opportunities
from filters import Filters
import datetime
from helpers import *

# TODO - post methods to handle form data are needed on the following routes: 
# /org/edit

# Voluntr landing page - accessed at localhost:5000 for now
@app.route("/", methods=['GET'])
def index():
    ''' displays a landing page that invites the user to interact 
    with the app as either a individual volunteer or an organization/non-profit 
    representative '''
    return render_template('index.html', title="Voluntr")


@app.route("/filters", methods=['GET', 'POST'])
def set_filters():
    '''displays a form for volunteers to select their interests and availability'''

    if request.method == 'POST':

        if 'category' in request.form.keys(): # if category was in form sent. assign it to var
            category = request.form['category']   
        else:
            category = "all" # if no category in form data, set to "all"

        if 'availableDays' in request.form.keys(): # if availability was in form sent. assign it to var
            availability = request.form.getlist('availableDays')
        else:
            availability = ["all"] # if no list of available days in form data, set to ["all"]

        avail = ""
        for i in range(len(availability)):
            avail = avail + availability[i] + "-"

        resp = make_response(redirect("/opportunities")) # tells the cookie to redirect to /opp after setting cookie
        resp.set_cookie('filters', str("0," + category + "," + avail)) # prepares cookie to be set with index of zero
        
        return resp # sets cookie and redirects

    categories = get_categories()

    return render_template('volunteer/filters.html', title="Voluntr | Filters", categories = categories)


@app.route("/opportunities", methods=['GET'])
def opportunities():
    '''display search results to volunteer'''

    if 'filters' in request.cookies:
        cookie = (request.cookies.get('filters')) #grabs cookie

        filters = cookie.split(",") # splits cookie into list
        num = int(filters[0]) # grabs index from list
        category = filters[1] # grabs category from list
        avail = filters[2] # grabs available days
        availability = avail.split("-") # splits into list

        search = Filters(category=category, availability=availability) # creates filter with given category and availability
        opps = search.search() #grabs list of opportunities
        opp = opps[num] # picks out the opp at index
        
        event_date = readable_date(opp.startDateTime)
        event_time = readable_times(opp.startDateTime, opp.duration)

        if len(opps) > (num + 1): 
            num = num + 1 # increments index if its not at the end of the list
        else:
            num = 0 # loops back around

        resp = make_response(render_template('volunteer/opportunities.html', 
                                            opp=opp, event_date = event_date, event_time=event_time, json=json, title="Voluntr | Browse Opportunities")
                                            ) # tells the cookie what to load while it sets itself
        resp.set_cookie('filters', str(num) + "," + category + "," + avail) #preps cookie for setting
        return resp # sets cookie and displays page
    
    return redirect("/filters") # redirects to filters if no cookie exists


@app.route("/matches", methods=['GET', 'POST'])
def display_matches():
    '''lists all opportunities that a volunteer user saved'''
    if request.method == 'POST':
        oppId = request.form['oppId']
        opp = get_opp_by_id(oppId)
        event_date = readable_date(opp.startDateTime)
        event_time = readable_times(opp.startDateTime, opp.duration)
        return render_template('volunteer/single_opp.html', title="Voluntr | Saved Opportunity", 
                                    opp=opp, event_date = event_date, event_time=event_time)

    return render_template('volunteer/matches.html', title="Voluntr | Saved Opportunities")


@app.route("/org/login", methods=['GET'])
def org_login():
    '''displays a form for organizations to signup or login to Voluntr'''
    return render_template('organization/login.html', title="Voluntr | Log In")
        
@app.route("/org/login", methods=['POST'])
def login():
    '''process a login attempt via OAuth token, return JSON'''
    token = request.get_json()["authToken"]

    # Start building a response
    response_content = {"token": token}

    # Check the validity of the OAuth token:
    google_id = process_oauth_token(token)
    if (google_id):
        response_content["valid_token"] = True

        # If the token is valid, see if the ID corresponds to an existing Voluntr account
        org_account = Organization.query.filter_by(id=google_id).first()

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

    # Expect to receive form data from the browser with 5 fields:
    # token, orgName, url, contactName, email
    # We'll convert the token to an ID with process_oauth_token()
    print ('\nSignup route received data: ', request.form)
    return redirect('/')


@app.route("/org/opportunities", methods=['GET'])
def manage_opportunities():
    '''displays all volunteer opportunities associated with an organization, with options to create
     new opportunities, or view an individual opportunity'''
    # TODO: hard coding a single org id here for now. Eventually, this information will be passed to 
    # this route by Oauth  
    org_id = 4

    org = Organization.query.filter_by(id=org_id).first()
    # define variables to pass into the template
    org_name = org.orgName
    opps = Opportunity.query.filter_by(owner_id = org_id).all()
    # format datetime into more readable strings
    for opp in opps:
        opp.startDateTime = readable_date(opp.startDateTime)
    
    return render_template('organization/opportunities.html', title='Voluntr | Opportunities', headerName = org_name, opportunities = opps)


@app.route("/org/add", methods=['GET', 'POST'])
def new_opportunity():
    '''displays a form for organizations to add a new volunteer opportunity'''
    
    if request.method == 'POST':
        # get all form data
        title = validate_title(request.form["title"])
        date = request.form["date"]
        start_time = request.form["startTime"]
        end_time = request.form["endTime"]
        address = request.form["address"]
        city = request.form["city"]
        state = request.form["state"]
        zip_code = request.form["zip"]
        category_class = request.form["category"]
        category = get_category(category_class)
        description = validate_description(request.form["description"])
        next_steps = validate_next_steps(request.form["nextsteps"])
        
        # format dateStartTime
        start_date_time = create_datetime(date, start_time)

        # get duration as an int
        duration = get_duration(start_time, end_time)

        # temporary hard-coded owner ID - to be removed when Oauth signin/sessions are completed 
        org_id = 4

        # TODO: server-side validation will be added here soon. 
        if validate_opp_data() == True:
            # save new, opportunity to db.
            new_opp = Opportunity(title, address, city, 
                                    state, zip_code, description,
                                    start_date_time, duration, 
                                    category_class, category, 
                                    next_steps, org_id)
            db.session.add(new_opp)
            db.session.commit()

            return redirect('/org/opportunities')
    
    # response for GET requests:
    categories = get_categories()

    return render_template('organization/add.html', title='Voluntr | Add Opportunity', categories = categories)


@app.route("/org/edit", methods=['GET'])
def edit_opportunity():
    ''' displays a form pre-populated with data for a single opportunity, so the user can 
    either edit individual fields and repost the opportunity, or remove the opportunity 
    from the app '''
    return render_template('organization/edit.html', title='Voluntr | Edit Opportunity')


@app.route("/org/opportunity", methods=['GET'])
def show_opportunity():
    '''displays details about a specific volunteer opportunity, with option to edit/delete the opportunity''' 
    return render_template('organization/preview.html', title="Voluntr | Preview Post")


# Run this route upon app startup to load sample data
@app.route("/drop_create", methods=['GET'])
def dropCreate():
    db.drop_all()
    db.create_all()
    add_orgs()
    add_opportunities()
    
    return redirect('/')

# runs the app, always the last line
if __name__ == '__main__':
    app.run()
