import csv 
import datetime
import time
from app import app, db
from models.org import Organization, Opportunity

def add_orgs():    

    ''' Populates the database with organization sample data found in organizations.csv '''

    # isolate and read data from org csv
    orgfile = open('csvdata/organizations.csv')
    read_orgs = csv.reader(orgfile, delimiter=',')        
    
    # loops over sample data and creates a new Organization with the contents of each row
    for row in read_orgs:
        org_name = row[0]
        email = row[1]
        url = row[2]
        contact_name = row[3]
        userid = row[4]
        new_org = Organization(userid, org_name, email, url, contact_name)
        # adds and commits the new organization to the db
        db.session.add(new_org)
        db.session.commit()

    time.sleep(3)
    # isolate and read data from opps csv
    oppsfile = open('csvdata/opportunities.csv')
    read_opps = csv.reader(oppsfile, delimiter=',')

    # loops over sample data and creates a new Opportunity with the contents of each row
    for row in read_opps:
        title = row[0]
        address = row[1]
        city = row[2]
        state = row[3]
        zip_code = row[4]
        description = row[5]
        if row[6] == "null":
            start_time = datetime.datetime(2100, 1, 1, 23, 30)
        else:
            start_time = datetime.datetime(int(row[6]), int(row[7]), int(row[8]), int(row[9]), int(row[10]))
        if row[11] == "null":
            duration = 0
        else:
            duration = int(row[11])
        cat_class = row[12]
        category = row[13]
        next_steps = row[14]
        owner = int(row[15])
        new_opp = Opportunity(title, 
                                address, 
                                city, 
                                state, 
                                zip_code, 
                                description, 
                                start_time, 
                                duration, 
                                cat_class,
                                category, 
                                next_steps, 
                                owner)
        # adds and commits the new opportunity to the db
        db.session.add(new_opp)
        db.session.commit()

    return True
