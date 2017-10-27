import csv 
from app import app, db
from models.org import Organization

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

    return True
