from helpers.category_helpers import get_categories
from pyzipcode import ZipCodeDatabase, ZipNotFoundException

# Opp search helpers
##########################
def increment(index, length):
    if length > (index + 1): 
        index = index + 1 # increments index if its not at the end of the list
    else:
        index = 0 # loops back around
    return index

def list_to_string(theList):
    return "-".join(theList)

def process_category(form):
    if 'category' in form.keys(): # if category was in form sent. assign it to var
        category = form.getlist('category')   
        if len(category) in [0, len(get_categories())]:
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
        return "Sorry, No results were found. Try a less refined search."

    return False

def get_zips_list(center_zipcode, distance):
    # use the ZipCodeDatabase package to get a list of zipcodes within the provided radius
    try:
        zcdb = ZipCodeDatabase()
        zip_objects = zcdb.get_zipcodes_around_radius(center_zipcode, distance)
    except ZipNotFoundException:
        error = "Zip code not found. Please check your zip code and try again."
        return error

    # grab the .zip property from each returned zipcode object
    def get_zip(zipObj):
        return zipObj.zip

    return list(map(get_zip, zip_objects))
