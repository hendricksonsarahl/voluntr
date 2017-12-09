from datetime import datetime
from models.org import Opportunity
from helpers.opp_search_helpers import get_zips_list
from sqlalchemy import func

class Filters():

    def __init__(self, categories="all", availability=["all"], zipcode="all", distance="all"):

        self.categories = categories
        self.availability = availability
        self.zipcode = zipcode
        self.distance = distance

    def search(self):

        #begin constructing the SQLAlchemy query
        query = Opportunity.query.filter_by(display = 1)

        # if needed, filter by categories
        if self.categories[0] != "all":
            query = query.filter(Opportunity.category_class.in_(self.categories))

        # if needed, filter by day
        if self.availability[0] != "all":
            query = query.filter((func.dayofweek(Opportunity.startDateTime).in_(self.availability)) | (func.year(Opportunity.startDateTime) == 2100))
        
        # if needed, filter by zip code
        if self.zipcode != "all" and self.distance != "all":
            included_zips = get_zips_list(self.zipcode, self.distance)
            query = query.filter(Opportunity.zipcode.in_(included_zips))

        # return opps that match query
        return query.all()
