from flask import Flask, request, redirect, render_template, flash, url_for

# app setup
app = Flask(__name__)
app.config['DEBUG'] = True

# Voluntr landing page - accessed at localhost:5000 for now
@app.route("/", methods=['GET'])
def index():
    ''' displays a landing page that invites the user to interact 
    with the app as either a individual volunteer or an organization/non-profit 
    representative '''
    # TODO - replace message with landing page template
    message = "<h1>Welcome to Voluntr!</h1>"
    return message

# TODO - post methods to handle form data are needed on the following routes: 
# /filters 
# /org/login
# /org/add
# potentially on /org/opportunity (if editing an opportunity takes place there)
# projects to look in for ideas: (web-caesar, user-signup, hello-flask, flicklist-flask)

@app.route("/filters", method=['GET'])
def set_filters():
    '''displays a form for volunteers to select their interests and availability'''
    message = "<h1>Volunteers set search parameters here</h1>"
    return message

@app.route("/opportunities", method=['GET'])
def opportunities():
    '''display search results to volunteer'''
    message = "<h1>Volunteers can view opportunities that match their interests here</h1>"
    return message

@app.route("/matches", method=['GET'])
def display_matches():
    '''lists all opportunities that a volunteer user saved'''
    message = "<h1>Volunteers can view their list of saved opportunities here</h1>"
    return message

@app.route("/org/login", method =['GET'])
def org_login():
    '''displays a form for organizations to signup or login to Voluntr'''
    message = "<h1>Organizations can click a button to signup or login here</h1>"
    return message

@app.route("/org/opportunities", method=['GET'])
def manage_opportunities():
    '''displays all volunteer opportunities associated with an organization, with options to create
     new opportunities, view/edit details, and delete available opportunities'''
     message = "<h1>Organizations can manage their available opportunities here</h1>"
     return message

@app.route("/org/add", method=['GET'])
def new_opportunity():
    '''displays a form for organizations to add a new volunteer opportunity'''
    message = "<h1>Organizations can add a new volunteer opportunity to the app here</h1>"
    return message

@app.route("/org/opportunity", method=['GET'])
def show_opportunity():
     '''displays details about a specific volunteer opportunity, with option to edit fields, 
     and a list volunteers interested in helping''' 
    message = "<h1>Organizations can view details of a volunteer opportunity, as well as a list of volunteers interested in the opportunity here</h1>"
    return message

# runs the app, always the last line
if __name__ == '__main__':
    app.run()
