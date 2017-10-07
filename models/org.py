from app import db

class Organization(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    email = db.Column(db.String(120), unique=True)
    address = db.Column(db.String(200))
    Opportunities = db.relationship('Opportunity', backref='owner')

    def __init__(self, name, email, address):
        self.email = email
        self.address = address
        self.name = name

    def __repr__(self):
        return '<Organization %r>' % self.email

class Opportunity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120))
    location = db.Column(db.String(200))
    description = db.Column(db.String(1000))
    nextSteps = db.Column(db.String(1000))
    date = db.Column(db.String(20))
    startTime = db.Column(db.String(20))
    endTime = db.Column(db.String(20))
    category = db.Column(db.String(35))
    owner_id = db.Column(db.Integer, db.ForeignKey('organization.id'))

    def __init__(self, title, owner, location, description, nextSteps, date, startTime, endTime, category):
        self.title = title
        self.owner = owner
        self.location = location
        self.description = description
        self.nextSteps = nextSteps
        self.date = date
        self.startTime =startTime
        self.endTime = endTime
        self.category = category

    def __repr__(self):
        return '<Opportunity %r>' % self.title