# no imports needed?  
# TODO: test in morning

# Category helpers
##############################3
def get_categories():
    ''' returns a dictionary containing category_class:category key value pairs ''' 
    categories = { "animals":"Animals",
                    "arts_culture":"Arts & Culture", 
                    "kids_youth":"Children & Youth",
                    "community":"Community", 
                    "education_lit":"Education & Literacy",  
                    "environment":"Environment & Nature", 
                    "health_med":"Health & Medicine", 
                    "houseless":"Homeless & Housing", 
                    "hunger":"Hunger", 
                    "disabilities":"People with Disabilities"}
    return categories

def get_category(cat_class):
    ''' Given a string representing a category class, this function 
    returns the related category '''
    categories = get_categories()
    return categories[cat_class]

def get_cat_class(category):
    ''' Given a string representing a category, returns a string 
    representing the related category class '''
    categories = get_categories()
    for key in categories.keys():
        if get_category(key) == category:
            return key