from app import db
from models.org import Opportunity
from helpers import get_day, get_categories

class Filters():

    def __init__(self, categories="all", availability=["all"]):

        self.categories = categories
        self.availability = availability

    def search(self):
        print(self.categories)
        if self.categories[0] == "all" or len(self.categories) == len(get_categories()):
            opps = Opportunity.query.all()

        else:
            opps = []
            for i in range(len(self.categories)):
                opps = opps + Opportunity.query.filter_by(category_class=self.categories[i]).all()


        if self.availability[0] != "all" and len(self.availability) != 7:
            opps = self.filter_by_days(opps)

        return opps

    def filter_by_days(self, opps):
        filtered = []
        for i in range(len(opps)):
            if get_day(opps[i].startDateTime) == "all":
                filtered = filtered + [opps[i]]
            else:
                if get_day(opps[i].startDateTime) in self.availability:
                    filtered = filtered + [opps[i]]
        return filtered
