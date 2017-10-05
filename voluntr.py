from flask import Flask, request, redirect, render_template, flash, url_for
from app import app, db

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

# TODO -- add all other routes
# projects to look in for ideas: (web-caesar, user-signup, hello-flask, flicklist-flask)
# Routes to build:
# =======================
# 1- /filters - form for volunteers to indicate their interests
# 2- /opportunities - display search results to volunteer
# 3- /matches - lists all volunteer opportunities that a volunteer user saved/marked as "interesting"
# 4- /org/login - form for organizations to signup or login to Voluntr
# 5- /org/opportunities - displays all volunteer opportunities associated with an organization, with options to create new, view/edit details, and delete
# 6- /org/add - form for organizations to add a new volunteer opportunity
# 7- /org/opportunity?id=XX - displays details about a specific volunteer opportunity, with option to edit fields, and a list of interested volunteers 


# runs the app, always the last line
if __name__ == '__main__':
    app.run()
