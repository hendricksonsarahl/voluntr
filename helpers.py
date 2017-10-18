import datetime

def readable_date(opp_date):
    ''' takes a single datetime input and returns a string to display along with opportunities '''
    if opp_date == datetime.datetime(2100,1,1,23,30):
        opp_date = "Flexible schedule"
    else:
        opp_date = opp_date.strftime('%A, %B %d, %Y')
    return opp_date

