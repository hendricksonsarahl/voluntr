from filters import Filters
from models.org import Opportunity


filters = Filters(zipcode="09442")

for i in range(2):
    op = filters.search()
    title = op.title
    description = op.description
    date = op.startDateTime
    print(title + "\n" + description + "\n" + str(date) + "\n-------\n")

filters = Filters(category="rasbury")

op = filters.search()
title = op.title
description = op.description
date = op.startDateTime
print(title + "\n" + description + "\n" + str(date) + "\n-------\n")

filters = Filters()

for i in range(4):
    op = filters.search()
    title = op.title
    description = op.description
    date = op.startDateTime
    print(title + "\n" + description + "\n" + str(date) + "\n-------\n")