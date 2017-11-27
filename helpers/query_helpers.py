from app import db
from models.org import Opportunity, Organization

# Query helpers
###########################
def get_opp_by_id(oppId):
    return Opportunity.query.get(oppId)