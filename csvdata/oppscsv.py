import csv 
import datetime
from app import app, db
from models.org import Opportunity

def add_opportunities():
    ''' Populates the database with opportunity sample data found in opportunities.csv '''
    
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
        start_time = datetime.datetime(2017, 10, 31, 23, 30)
        if row[7] == "null":
            duration = 0
        else:
            duration = int(row[7])
        category = row[8]
        next_steps = row[9]
        owner = int(row[10])
        new_opp = Opportunity(title, 
                                address, 
                                city, 
                                state, 
                                zip_code, 
                                description, 
                                start_time, 
                                duration, 
                                category, 
                                next_steps, 
                                owner)
        # adds and commits the new opportunity to the db
        db.session.add(new_opp)
        db.session.commit()
    
    return True