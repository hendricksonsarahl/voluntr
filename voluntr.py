from flask import Flask, request, redirect, render_template, flash, url_for, json, make_response
from app import app, db
from models.org import Organization, Opportunity
from csvdata.orgcsv import add_orgs
from csvdata.oppscsv import add_opportunities
from filters import Filters
import datetime
from helpers import readable_date

# TODO - post methods to handle form data are needed on the following routes: 
# /filters 
# /org/login
# /org/add
# /org/edit
# projects to look in for ideas: (web-caesar, user-signup, hello-flask, flicklist-flask)


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
        if 'category' in request.form.values(): # if category was in form sent. assign it to var
            category = request.form['category'] 
        else:
            category = "all" # if not set to "all"

        resp = make_response(redirect("/opportunities")) # tells the cookie to redirect to /opp after setting cookie
        resp.set_cookie('filters', str("0 " + category)) # prepares cookie to be set with index of zero
        return resp # sets cookie and redirects

    return render_template('volunteer/filters.html', title="Voluntr | Filters")

@app.route("/opportunities", methods=['GET'])
def opportunities():
    '''display search results to volunteer'''

    if 'filters' in request.cookies:
        cookie = (request.cookies.get('filters')) #grabs cookie

        filters = cookie.split(" ") # splits cookie into list
        num = int(filters[0]) # grabs index from list
        category = filters[1] # grabs category from list

        search = Filters(category=category) # creates filter with given category
        opp = search.search(num) #finds an oppertunity using filter and index
        num = num + 1 # increments index

        resp = make_response(render_template('volunteer/opportunities.html', 
                                            opp=opp, title="Voluntr | Browse Opportunities")
                                            ) # tells the cookie what to load while it sets itself
        resp.set_cookie('filters', str(num) + " " + category) #preps cookie for setting
        return resp # sets cookie and displays page
    
    return redirect("/filters") # redirects to filters if no cookie exists

@app.route("/matches", methods=['GET'])
def display_matches():
    '''lists all opportunities that a volunteer user saved'''
    return render_template('volunteer/matches.html', title="Voluntr | Saved Opportunities")

@app.route("/org/login", methods=['GET'])
def org_login():
    '''displays a form for organizations to signup or login to Voluntr'''
    return render_template('organization/login.html', title="Voluntr | Log In")

@app.route("/org/opportunities", methods=['GET'])
def manage_opportunities():
    '''displays all volunteer opportunities associated with an organization, with options to create
     new opportunities, or view an individual opportunity'''
    # TODO: hard coding a single org id here for now. Eventually, this information will be passed to 
    # this route by Oauth  
    org_id = 6
    org = Organization.query.filter_by(id=org_id).first()
    # define variables to pass into the template
    org_name = org.orgName
    opps = Opportunity.query.filter_by(owner_id = org_id).all()
    # format datetime into more readable strings
    for opp in opps:
        opp.startDateTime = readable_date(opp.startDateTime)
    
    return render_template('organization/opportunities.html', title="Voluntr | Opportunities", headerName = org_name, opportunities = opps)

@app.route("/org/add", methods=['GET'])
def new_opportunity():
    '''displays a form for organizations to add a new volunteer opportunity'''
    return render_template('organization/add.html', title="Voluntr | Add Opportunity")

@app.route("/org/edit", methods=['GET'])
def edit_opportunity():
    ''' displays a form pre-populated with data for a single opportunity, so the user can 
    either edit individual fields and repost the opportunity, or remove the opportunity 
    from the app '''
    return render_template('organization/edit.html', title="Voluntr | Edit Opportunity")

@app.route("/org/opportunity", methods=['GET'])
def show_opportunity():
    '''displays details about a specific volunteer opportunity, with option to edit/delete the opportunity''' 
    return render_template('organization/preview.html', title="Voluntr | Preview Post")

@app.route("/org/login", methods=['POST'])
def login():
    '''process a login attempt via OAuth token'''
    token = request.get_json()["authToken"]
    print ('\nLogin route received data: ', request.get_json())
    print ('\nOAuth token to parse: ', token)
    return json.jsonify({"message": "All is well.", "token": token})

@app.route("/org/signup", methods=['POST'])
def signup():
    '''process a sign-up attempt with an Oauth token and some form data'''
    print ('\nSignup route received data: ', request)
    return redirect('/')

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
