from app import db
from models.org import Opportunity
from helpers import get_day

class Filters():

    def __init__(self, category="all", availability=["all"]):

        self.category = category
        self.availability = availability

    def search(self):
        if self.category == "all":
            opps = Opportunity.query.all()

        else:
            opps = Opportunity.query.filter_by(category_class=self.category).all()


        if self.availability[0] != "all" and len(self.availability) != 7:
            opps = self.filter_by_days(opps)

        return opps

    def filter_by_days(self, opps):
        filtered = []
        for i in range(len(opps)):
            for j in range (len(self.availability)):
                if get_day(opps[i].startDateTime) == self.availability[j] or get_day(opps[i].startDateTime) == "all":
                    filtered = filtered + [opps[i]]
        return filtered
