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