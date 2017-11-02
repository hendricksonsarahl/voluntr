from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

if 'CLEARDB_DATABASE_URL' in os.environ:
  print ('Found it!')
else:
  print ('No CLEARDB_DATABASE_URL!')

app = Flask(__name__)
app.config['DEBUG'] = True      # displays runtime errors in the browser, too
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://voluntr:voluntr@localhost:8889/voluntr'
app.config['SQLALCHEMY_ECHO'] = True

db = SQLAlchemy(app)
