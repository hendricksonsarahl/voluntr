from app import db
from models.org import Opportunity

class Filters():

    def __init__(self, zipcode=0, distance=0, category="all", availability="all"):
        self.zipcode = zipcode
        self.distance = distance
        self.category = category
        self.availability = availability
        self.index = 0
        self.option = 0


    def pickOption(self):
        for prop in self:
            print(prop)
        if self.zipcode != 0 or self.distance != 0:
            if self.zipcode == 0 or self.distance == 0:
                if self.zipcode == 0:
                    ## dist has value
                    ## zip does not
                    self.option = 1
                else:
                    ## zip has value 
                    ## dist does not
                    self.option = 2
            else:
                ## both zip and dist have values
                self.option = 3
        if self.category != "all" or self.availability != "all":
            if self.category == "all" or self.availability == "all":
                if self.category == "all":
                    ## cat = all
                    ## avail has a specified value
                    self.option = self.option + 10
                else:
                    ## avail = all
                    ## cat has a specified value
                    self.option = self.option + 20
            else:
                ## both cat and avail have specified values
                self.option = self.option + 30
        if self.zipcode == 0 and self.distance == 0 and self.category == "all" and self.availability == "all":
            self.option = 44


            
    def search(self):
        if self.option == 0:
            ## option has not been decided
            self.pickOption()

        if self.option == 44:
            ## all default
            ops = Opportunity.query.all()

            op = ops[self.index]

        elif self.option == 33:
            ## all specified
            ops = Opportunity.query.filter_by(zipcode=self.zipcode, category=self.category).all()
            op = ops[self.index]

        elif self. option == 32:
            ## dist = default
            ops = Opportunity.query.filter_by(zipcode=self.zipcode, category=self.category).all()
            op = ops[self.index]

        elif self.option == 31:
            ## zip = default
            ops = Opportunity.query.filter_by(category=self.category).all()
            op = ops[self.index]

        elif self.option == 30:
            ## cat and avail specified
            ops = Opportunity.query.filter_by(category=self.category).all()
            op = ops[self.index]

        elif self.option == 23:
            ## avail = default
            ops = Opportunity.query.filter_by(zipcode=self.zipcode, category=self.category).all()
            op = ops[self.index]

        elif self.option == 22:
            ## cat and zip specified
            ops = Opportunity.query.filter_by(zipcode=self.zipcode, category=self.category).all()
            op = ops[self.index]

        elif self.option == 21:
            ## cat and dist specified
            ops = Opportunity.query.filter_by(category=self.category).all()
            op = ops[self.index]

        elif self.option == 20:
            ## cat specified
            ops = Opportunity.query.filter_by(category=self.category).all()
            op = ops[self.index]

        elif self.option == 13:
            ## cat = default
            ops = Opportunity.query.filter_by(zipcode=self.zipcode).all()
            op = ops[self.index]

        elif self.option == 12:
            ## avail and zip specified
            ops = Opportunity.query.filter_by(zipcode=self.zipcode).all()
            op = ops[self.index]

        elif self.option == 11:
            ## avail and dist specified
            ops = Opportunity.query.filter_by().all()
            op = ops[self.index]

        elif self.option == 10:
            ## avail specified
            ops = Opportunity.query.filter_by().all()
            op = ops[self.index]

        elif self.option == 3:
            ## zip and dist specified
            ops = Opportunity.query.filter_by(zipcode=self.zipcode).all()
            op = ops[self.index]

        elif self.option == 2:
            ## zip specified
            ops = Opportunity.query.filter_by(zipcode=self.zipcode).all()
            op = ops[self.index]

        elif self.option == 1:
            ## dist specified
            ops = Opportunity.query.filter_by().all()
            op = ops[self.index]
        
        self.index += 1
        return op
