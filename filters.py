from app import db
from models.org import Opportunity
from helpers import get_day
from pyzipcode import ZipCodeDatabase, ZipNotFoundException

zcdb = ZipCodeDatabase()

class Filters():

    def __init__(self, category="all", availability=["all"], zipcode="all", distance="all"):

        self.category = category
        self.availability = availability
        self.zipcode = zipcode
        self.distance = distance

    def search(self):
        if self.category == "all":
            opps = Opportunity.query.all()

        else:
            opps = Opportunity.query.filter_by(category_class=self.category).all()

        if self.availability[0] != "all" and len(self.availability) != 7:
            opps = self.filter_by_days(opps)

        if self.zipcode != "all" and self.distance != "all":
            opps = self.filter_by_location(opps)

        return opps

    def filter_by_days(self, opps):
        filtered = []
        for i in range(len(opps)):
            if get_day(opps[i].startDateTime) == "all":
                filtered = filtered + [opps[i]]
            else:
                for j in range (len(self.availability)):
                    if get_day(opps[i].startDateTime) == self.availability[j]:
                        filtered = filtered + [opps[i]]
        return filtered

    def filter_by_location(self, opps):
        try:
            filtered = []
            zips = zcdb.get_zipcodes_around_radius(self.zipcode, self.distance)
            for i in range(len(opps)):
                for j in range (len(zips)):
                    if opps[i].zipcode == zips[j].zip:
                        filtered = filtered + [opps[i]]
            return filtered
        except ZipNotFoundException:
            #TODO Send meaningful feedback to browser. For now, it's just ignoring the location filter
            print('Zip code not found.')
            return opps
            
                
        