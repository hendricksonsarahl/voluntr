from app import db
from datetime import datetime

class Organization(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.String(200), unique=True)
    orgName = db.Column(db.String(120), unique=True)
    email = db.Column(db.String(120), unique=True)
    url = db.Column(db.String(200))
    contactName = db.Column(db.String(50))
    opportunities = db.relationship('Opportunity', backref='owner')

    def __init__(self, userid, orgName, email, url, contactName):
        self.userid = userid
        self.orgName = orgName
        self.email = email
        self.url = url
        self.contactName = contactName

    def __repr__(self):
        return '<Organization %r>' % self.orgName

class Opportunity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120))
    address = db.Column(db.String(50))
    city = db.Column(db.String(25))
    state = db.Column(db.String(2))
    zipcode = db.Column(db.String(5))
    description = db.Column(db.String(1000))
    startDateTime = db.Column(db.DateTime)
    duration = db.Column(db.Integer)
    category_class = db.Column(db.String(20))
    category = db.Column(db.String(35))
    nextSteps = db.Column(db.String(1000))
    owner_id = db.Column(db.Integer, db.ForeignKey('organization.userid'))

    def __init__(self, title, address, city, state, zipcode, description, startDateTime, duration, category_class, category, nextSteps, owner):
        self.title = title
        self.address = address
        self.city = city
        self.state = state
        self.zipcode = zipcode
        self.description = description
        self.startDateTime = startDateTime
        self.duration = duration
        self.category_class = category_class
        self.category = category
        self.nextSteps = nextSteps
        self.owner_id = owner

    def __repr__(self):
        return '<Opportunity %r>' % self.title