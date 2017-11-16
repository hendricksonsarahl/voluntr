from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

# Check environment variables to determine Heroku vs. local database
if 'CLEARDB_DATABASE_URL' in os.environ:
  db_uri = os.environ['CLEARDB_DATABASE_URL']
else:
  db_uri = 'mysql+pymysql://voluntr:voluntr@localhost:8889/voluntr'

app = Flask(__name__)

# Settings for both production and development environments:
app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
app.config['SQLALCHEMY_ECHO'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'ZAj08N/$3m]XHjHy!rX R/~?X,9RW@UL'

if 'IS_PRODUCTION' in os.environ:
  # Production-only settings
  app.config['DEBUG'] = False
  app.config['SQLALCHEMY_POOL_RECYCLE'] = 30 # required to keep connections to ClearDB from failing

else:
  # Development-only settings
  app.config['DEBUG'] = True      # displays runtime errors in the browser, too
  app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0 # re-load static assets every time

db = SQLAlchemy(app)