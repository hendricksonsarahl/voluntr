from app import db
from models.org import Opportunity
from helpers import get_day
from pyzipcode import ZipCodeDatabase

zcdb = ZipCodeDatabase()

class Filters():

    def __init__(self, category="all", availability=["all"], zip="97232", distance=5):

        self.category = category
        self.availability = availability
        self.zip = zip
        self.distance = distance

    def search(self):
        if self.category == "all":
            opps = Opportunity.query.all()

        else:
            opps = Opportunity.query.filter_by(category_class=self.category).all()


        if self.availability[0] != "all" and len(self.availability) != 7:
            opps = self.filter_by_days(opps)

        opps = self.filter_by_zip(opps)

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

    def filter_by_zip(self, opps):
        filtered = []
        zips = zcdb.get_zipcodes_around_radius(self.zip, self.distance)
        for i in range(len(opps)):
            for j in range (len(zips)):
                if opps[i].zipcode == zips[j].zip:
                    filtered = filtered + [opps[i]]
                
        return filtered