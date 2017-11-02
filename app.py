from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

if 'CLEARDB_DATABASE_URL' in os.environ:
  db_uri = os.environ['CLEARDB_DATABASE_URL']
else:
  db_uri = 'mysql+pymysql://voluntr:voluntr@localhost:8889/voluntr'

print ('db_uri = ', db_uri)

app = Flask(__name__)
app.config['DEBUG'] = True      # displays runtime errors in the browser, too
app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
app.config['SQLALCHEMY_ECHO'] = True

db = SQLAlchemy(app)
