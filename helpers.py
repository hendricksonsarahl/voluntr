import datetime
from models.org import Opportunity, Organization
from google.oauth2 import id_token
from google.auth.transport import requests
from app import db

# datetime object formatting helpers
######################################

def get_day(opp_date):
    """takes in a datetime and returns the day of the week"""
    if opp_date == datetime.datetime(2100,1,1,23,30):
        return "all"
    return opp_date.strftime('%A')


def readable_date(opp_date):
    ''' takes a single datetime input and returns a string to display along with opportunities '''
    if opp_date == datetime.datetime(2100,1,1,23,30):
        opp_date = "Flexible schedule"
    else:
        opp_date = opp_date.strftime('%A, %B %d, %Y')
    return opp_date

def readable_times(opp_datetime, duration):
    ''' takes a datetime input and an int representing duration
    in minutes; returns a string to show the time range for an event '''
    
    # check for flexible schedule opportunities
    # TODO: remove this check when test data is no longer in use
    if duration == 0:
        return ""

    start_hour = int(opp_datetime.strftime("%H"))
    start_minutes = int(opp_datetime.strftime("%M"))
    end_hour = start_hour 
    end_minutes = start_minutes + duration

    if end_minutes > 60:
        end_hour += end_minutes//60
        end_minutes = end_minutes % 60

    #determine AM or PM
    if start_hour >= 12:
        start_suffix = "PM"
        if start_hour > 12:
            start_hour %= 12
    else:
        start_suffix = "AM"
    
    if end_hour >= 12:
        end_suffix = "PM"
        if end_hour > 12:
            end_hour %= 12     
    else:
        end_suffix = "AM"
    
    #check for single digit minutes:
    if start_minutes < 10:
        start_minutes = "0" + str(start_minutes)
    if end_minutes < 10:
        end_minutes = "0" + str(end_minutes)

    # convert times to string and reformat
    start_time = str(start_hour) + ":" + str(start_minutes) + " " + start_suffix
    end_time = str(end_hour) + ":" + str(end_minutes) + " " + end_suffix

    return start_time + " - " + end_time 

def get_duration(start_time, end_time):
    ''' takes 2 strings representing 'hh:mm' and returns the 
    difference in minutes as an integer '''
    
    # split strings and remove the colon
    start_list = start_time.split(":")
    end_list = end_time.split(":")
    
    # convert to time to integers and multiply hours by 60 to get total in minutes
    start_total_min = (int(start_list[0]) * 60) + int(start_list[1])
    end_total_min = (int(end_list[0]) * 60) + int(end_list[1])
    
    return end_total_min - start_total_min

def create_datetime(date, start_time):
    ''' takes 2 strings as input in the forms 'YYYY-MM-DD' and 'HH:MM'
    and returns a datetime object representing the start date and time
    of the opportunity '''
    
    date_list = date.split("-")
    time_list = start_time.split(":")

    start_date_time = datetime.datetime(int(date_list[0]), int(date_list[1]),
                                            int(date_list[2]), int(time_list[0]), 
                                            int(time_list[1]))
    
    return start_date_time

def get_start_time(opp_datetime):
    start_hour = int(opp_datetime.strftime("%H"))
    start_minutes = int(opp_datetime.strftime("%M"))
    
    if start_minutes < 10:
        start_minutes = "0" + str(start_minutes)

    return str(start_hour) + ":" + str(start_minutes)

def get_end_time(opp_datetime, duration):
    end_hour = int(opp_datetime.strftime("%H"))
    end_minutes = int(opp_datetime.strftime("%M")) + duration
    
    if end_minutes > 60:
        end_hour += end_minutes//60
        end_minutes = end_minutes % 60
    
    if end_minutes < 10:
        end_minutes = "0" + str(end_minutes)

    return str(end_hour) + ":" + str(end_minutes)
    
# Opportunity form input helpers 
###################################

def validate_opp_data():
    return True

def validate_org_data():
    return True

def validate_title(title_input):
    ''' takes a single string input and returns a placeholder title if an empty string was submitted '''
    
    if len(title_input) == 0:
        return "Missing title: please contact organization for details"
    
    return title_input 

def validate_description(input_text):
    ''' takes a single string as input, returns a placeholder message if the input string is empty '''
    
    if len(input_text) == 0:
        return "Please contact the organization at the url above for more details"

    return input_text

def validate_next_steps(input_text):
    ''' takes a single string as input, returns a placeholder message if the input string is empty '''
    
    if len(input_text) == 0:
        return "Please contact the organization at the url above for more details"

    return input_text

# OAuth
######################

# Check the validity of an OAuth token, and return a Google ID (if valid) or False
def process_oauth_token(token):
    try:
        CLIENT_ID = "649609603099-g73psa76kgviat4mdh2ctt1pk8he11bb.apps.googleusercontent.com"
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)

        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError('Wrong issuer.')
        
        # ID token is valid. Get the user's Google Account ID from the decoded token.
        userid = idinfo['sub']

        return userid

    # TODO: Error handling
    except ValueError:
        # Invalid token
        return None

def process_org_token(token):
    userid = process_oauth_token(token)
    return Organization.query.filter_by(userid=userid).first()

# Category helpers
##############################3
def get_categories():
    ''' returns a dictionary containing category_class:category key value pairs ''' 
    categories = { "animals":"Animals",
                    "arts_culture":"Arts & Culture", 
                    "kids_youth":"Children & Youth",
                    "community":"Community", 
                    "education_lit":"Education & Literacy",  
                    "environment":"Environment & Nature", 
                    "health_med":"Health & Medicine", 
                    "houseless":"Homeless & Housing", 
                    "hunger":"Hunger", 
                    "disabilities":"People with Disabilities"}
    return categories

def get_category(cat_class):
    ''' Given a string representing a category class, this function 
    returns the related category '''
    categories = get_categories()
    return categories[cat_class]

def get_cat_class(category):
    ''' Given a string representing a category, returns a string 
    representing the related category class '''
    categories = get_categories()
    for key in categories.keys():
        if get_category(key) == category:
            return key

# State name and abbreviation data
######################################
def get_states():
    states = [
        {'abbreviation': 'AK', 'name': 'Alaska'},
        {'abbreviation': 'AL', 'name': 'Alabama'},
        {'abbreviation': 'AR', 'name': 'Arkansas'},
        {'abbreviation': 'AS', 'name': 'American Samoa'},
        {'abbreviation': 'AZ', 'name': 'Arizona'},
        {'abbreviation': 'CA', 'name': 'California'},
        {'abbreviation': 'CO', 'name': 'Colorado'},
        {'abbreviation': 'CT', 'name': 'Connecticut'},
        {'abbreviation': 'DC', 'name': 'District of Columbia'},
        {'abbreviation': 'DE', 'name': 'Delaware'},
        {'abbreviation': 'FL', 'name': 'Florida'},
        {'abbreviation': 'GA', 'name': 'Georgia'},
        {'abbreviation': 'GU', 'name': 'Guam'},
        {'abbreviation': 'HI', 'name': 'Hawaii'},
        {'abbreviation': 'IA', 'name': 'Iowa'},
        {'abbreviation': 'ID', 'name': 'Idaho'},
        {'abbreviation': 'IL', 'name': 'Illinois'},
        {'abbreviation': 'IN', 'name': 'Indiana'},
        {'abbreviation': 'KS', 'name': 'Kansas'},
        {'abbreviation': 'KY', 'name': 'Kentucky'},
        {'abbreviation': 'LA', 'name': 'Louisiana'},
        {'abbreviation': 'MA', 'name': 'Massachusetts'},
        {'abbreviation': 'MD', 'name': 'Maryland'},
        {'abbreviation': 'ME', 'name': 'Maine'},
        {'abbreviation': 'MI', 'name': 'Michigan'},
        {'abbreviation': 'MN', 'name': 'Minnesota'},
        {'abbreviation': 'MO', 'name': 'Missouri'},
        {'abbreviation': 'MP', 'name': 'Northern Mariana Islands'},
        {'abbreviation': 'MS', 'name': 'Mississippi'},
        {'abbreviation': 'MT', 'name': 'Montana'},
        {'abbreviation': 'NA', 'name': 'National'},
        {'abbreviation': 'NC', 'name': 'North Carolina'},
        {'abbreviation': 'ND', 'name': 'North Dakota'},
        {'abbreviation': 'NE', 'name': 'Nebraska'},
        {'abbreviation': 'NH', 'name': 'New Hampshire'},
        {'abbreviation': 'NJ', 'name': 'New Jersey'},
        {'abbreviation': 'NM', 'name': 'New Mexico'},
        {'abbreviation': 'NV', 'name': 'Nevada'},
        {'abbreviation': 'NY', 'name': 'New York'},
        {'abbreviation': 'OH', 'name': 'Ohio'},
        {'abbreviation': 'OK', 'name': 'Oklahoma'},
        {'abbreviation': 'OR', 'name': 'Oregon'},
        {'abbreviation': 'PA', 'name': 'Pennsylvania'},
        {'abbreviation': 'PR', 'name': 'Puerto Rico'},
        {'abbreviation': 'RI', 'name': 'Rhode Island'},
        {'abbreviation': 'SC', 'name': 'South Carolina'},
        {'abbreviation': 'SD', 'name': 'South Dakota'},
        {'abbreviation': 'TN', 'name': 'Tennessee'},
        {'abbreviation': 'TX', 'name': 'Texas'},
        {'abbreviation': 'UT', 'name': 'Utah'},
        {'abbreviation': 'VA', 'name': 'Virginia'},
        {'abbreviation': 'VI', 'name': 'Virgin Islands'},
        {'abbreviation': 'VT', 'name': 'Vermont'},
        {'abbreviation': 'WA', 'name': 'Washington'},
        {'abbreviation': 'WI', 'name': 'Wisconsin'},
        {'abbreviation': 'WV', 'name': 'West Virginia'},
        {'abbreviation': 'WY', 'name': 'Wyoming'}
    ]
    return states

# Query helpers
###########################
def get_opp_by_id(oppId):
    return Opportunity.query.get(oppId)

# Route helpers
##########################
def increment(index, length):
    if length > (index + 1): 
        index = index + 1 # increments index if its not at the end of the list
    else:
        index = 0 # loops back around
    return index

def list_to_string(theList):
    string = ""
    for i in range(len(theList)):
        string = string + theList[i] + "-"
    return string

def process_category(form):
    if 'category' in form.keys(): # if category was in form sent. assign it to var
        category = form.getlist('category')   
        if len(category) == len(get_categories()):
            category = ["all"] # if all category in form data, set to "all"
    else:
        category = ["all"] # if no category in form data, set to "all"
    cat = list_to_string(category)
    return cat

def process_zipcode(form):
    if 'zipcode' in form.keys(): # if zipcode was in form sent. assign it to var
        if len(form['zipcode']) == 5:
            zipcode = form['zipcode']
        else:
            zipcode = "all"    
    else:
        zipcode = "all" # if no zipcode in form data, set to "all"

    return zipcode

def process_availability(form):
    if 'availableDays' in form.keys(): # if availability was in form sent. assign it to var
        availability = form.getlist('availableDays')
        if len(availability) == 7:
            availability = ["all"] # if all days are in list of available days, set to ["all"]
                                    # (saves a lot of time sorting for no reason)

    else:
        availability = ["all"] # if no list of available days in form data, set to ["all"]
    avail = list_to_string(availability)
    return avail

def process_distance(form):
    if 'distance' in form.keys(): # if distance was in form sent. assign it to var
        distance = form['distance']   
    else:
        distance = "all" # if no distance in form data, set to "all"
    
    return distance

def check_opps(opps):
    if type(opps) == type("String"):
        return opps

    if len(opps) == 0:
        return "Sorry, No results were founnd. Try a less refined search."

    return False