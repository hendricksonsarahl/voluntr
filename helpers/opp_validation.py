# no imports needed?  
# TODO: test in morning

# Opportunity form input helpers 
###################################

def validate_opp_data():
    return True

def validate_org_data():
    return True

def validate_title(title_input):
    ''' takes a single string input and returns a placeholder title if an empty string was submitted '''
    
    if len(title_input) == 0:
        return "Missing title: please contact organization for details"
    
    return title_input 

def validate_description(input_text):
    ''' takes a single string as input, returns a placeholder message if the input string is empty '''
    
    if len(input_text) == 0:
        return "Please contact the organization at the url above for more details"

    return input_text

def validate_next_steps(input_text):
    ''' takes a single string as input, returns a placeholder message if the input string is empty '''
    
    if len(input_text) == 0:
        return "Please contact the organization at the url above for more details"

    return input_text