from models.org import Organization
from google.oauth2 import id_token
from google.auth.transport import requests
from app import db

# OAuth
######################

# Check the validity of an OAuth token, and return a Google ID (if valid) or False
def process_oauth_token(token):
    try:
        CLIENT_ID = "649609603099-g73psa76kgviat4mdh2ctt1pk8he11bb.apps.googleusercontent.com"
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)

        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError('Wrong issuer.')
        
        # ID token is valid. Get the user's Google Account ID from the decoded token.
        userid = idinfo['sub']

        return userid

    # TODO: Error handling
    except ValueError:
        # Invalid token
        return None

def process_org_token(token):
    userid = process_oauth_token(token)
    return Organization.query.filter_by(userid=userid).first()