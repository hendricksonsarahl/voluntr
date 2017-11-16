from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

# Check env variables to determine Heroku vs. local database
if 'CLEARDB_DATABASE_URL' in os.environ:
  db_uri = os.environ['CLEARDB_DATABASE_URL']
else:
  db_uri = 'mysql+pymysql://voluntr:voluntr@localhost:8889/voluntr'

app = Flask(__name__)

# Settings for both production and development environments:
app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
app.config['SQLALCHEMY_ECHO'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

if 'IS_PRODUCTION' in os.environ:
  # Production-only settings
  app.config['DEBUG'] = False
  app.config['SQLALCHEMY_POOL_RECYCLE'] = 30 # required to keep connections to ClearDB from failing

else:
  # Development-only settings
  app.config['DEBUG'] = True      # displays runtime errors in the browser, too
  app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0 # re-load static assets every time

# Check env variables to find an actually secret SECRET_KEY for Heroku deployment
if 'SECRET_KEY' in os.environ:
  app.secret_key = os.environ['SECRET_KEY']
else:
  app.secret_key = 'ZAj08N/$3m]XHjHy!rX R/~?X,9RW@UL'

db = SQLAlchemy(app)