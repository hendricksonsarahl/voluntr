import datetime

def readable_date(opp_date):
    ''' takes a single datetime input and returns a string to display along with opportunities '''
    if opp_date == datetime.datetime(2100,1,1,23,30):
        opp_date = "Flexible schedule"
    else:
        opp_date = opp_date.strftime('%A, %B %d, %Y')
    return opp_date

def readable_times(opp_datetime, duration):
    ''' takes a datetime input and an int representing duration
    in minutes; returns a string to show the time range for an event '''
    
    # check for flexible schedule opportunities
    # TODO: remove this check when test data is no longer in use
    if duration == 0:
        return ""

    start_hour = int(opp_datetime.strftime("%H"))
    start_minutes = int(opp_datetime.strftime("%M"))
    end_hour = start_hour 
    end_minutes = start_minutes + duration

    if end_minutes > 60:
        end_hour += end_minutes//60
        end_minutes = end_minutes % 60

    #determine AM or PM
    if start_hour >= 12:
        start_suffix = "PM"
        if start_hour > 12:
            start_hour %= 12
    else:
        start_suffix = "AM"
    
    if end_hour >= 12:
        end_suffix = "PM"
        if end_hour > 12:
            end_hour %= 12     
    else:
        end_suffix = "AM"
    
    #check for single digit minutes:
    if start_minutes < 10:
        start_minutes = "0" + str(start_minutes)
    if end_minutes < 10:
        end_minutes = "0" + str(end_minutes)

    # convert times to string and reformat
    start_time = str(start_hour) + ":" + str(start_minutes) + " " + start_suffix
    end_time = str(end_hour) + ":" + str(end_minutes) + " " + end_suffix

    return start_time + " - " + end_time 

def get_duration(start_time, end_time):
    ''' takes 2 strings representing 'hh:mm' and returns the 
    difference in minutes as an integer '''
    
    # split strings and remove the colon
    start_list = start_time.split(":")
    end_list = end_time.split(":")
    
    # convert to time to integers and multiply hours by 60 to get total in minutes
    start_total_min = (int(start_list[0]) * 60) + int(start_list[1])
    end_total_min = (int(end_list[0]) * 60) + int(end_list[1])
    
    return end_total_min - start_total_min

def create_datetime(date, start_time):
    ''' takes 2 strings as input in the forms 'YYYY-MM-DD' and 'HH:MM'
    and returns a datetime object representing the start date and time
    of the opportunity '''
    
    date_list = date.split("-")
    time_list = start_time.split(":")

    start_date_time = datetime.datetime(int(date_list[0]), int(date_list[1]),
                                            int(date_list[2]), int(time_list[0]), 
                                            int(time_list[1]))
    
    return start_date_time

def get_start_time(opp_datetime):
    start_hour = int(opp_datetime.strftime("%H"))
    start_minutes = int(opp_datetime.strftime("%M"))
    
    if start_minutes < 10:
        start_minutes = "0" + str(start_minutes)

    return str(start_hour) + ":" + str(start_minutes)

def get_end_time(opp_datetime, duration):
    end_hour = int(opp_datetime.strftime("%H"))
    end_minutes = int(opp_datetime.strftime("%M")) + duration
    
    if end_minutes > 60:
        end_hour += end_minutes//60
        end_minutes = end_minutes % 60
    
    if end_minutes < 10:
        end_minutes = "0" + str(end_minutes)

    return str(end_hour) + ":" + str(end_minutes)