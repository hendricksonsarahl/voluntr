from app import db
from models.org import Opportunity
from helpers import get_day, get_categories
from pyzipcode import ZipCodeDatabase, ZipNotFoundException

zcdb = ZipCodeDatabase()

class Filters():

    def __init__(self, categories="all", availability=["all"], zipcode="all", distance="all"):

        self.categories = categories
        self.availability = availability
        self.zipcode = zipcode
        self.distance = distance

    def search(self):

        opps = self.filter_by_categories()
        
        if self.availability[0] != "all" and len(self.availability) != 7:
            opps = self.filter_by_days(opps)

        if self.zipcode != "all" and self.distance != "all":
            opps = self.filter_by_location(opps)

        return opps

    def filter_by_categories(self):
        if self.categories[0] == "all" or len(self.categories) == len(get_categories()):
            opps = Opportunity.query.all()
        else:
            opps = []
            for i in range(len(self.categories)):
                opps = opps + Opportunity.query.filter_by(category_class=self.categories[i]).all()

        return opps

    def filter_by_days(self, opps):
        filtered = []

        for i in range(len(opps)):
            if get_day(opps[i].startDateTime) == "all":
                filtered = filtered + [opps[i]]
            elif get_day(opps[i].startDateTime) in self.availability:
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
            error = "Zip code not found. Please check your zipcode and try again. If it still does not work we appologize (your zipcode may not be supported yet)"
            return error
            
                
        