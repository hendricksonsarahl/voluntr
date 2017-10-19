from app import db
from models.org import Opportunity

class Filters():

    def __init__(self, category="all"):

        self.category = category

    def search(self):
        if self.category == "all":
            opps = Opportunity.query.all()

        else:
            opps = Opportunity.query.filter_by(category=self.category).all()
            
        return opps
