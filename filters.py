from app import db
from models.org import Opportunity

class Filters():

    def __init__(self, category="all"):

        self.category = category
        self.index = 0


    def search(self, index=0):
        if index != 0:
            self.index = index
        if self.category == "all":
            opps = Opportunity.query.all()

        else:
            opps = Opportunity.query.filter_by(category=self.category).all()
            
        opp = opps[self.index]
        if len(opps) > self.index:
            self.index += 1
        else: 
            self.index = 0
        return opp