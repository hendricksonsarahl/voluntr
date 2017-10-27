from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['DEBUG'] = True      # displays runtime errors in the browser, too
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://voluntr:voluntr@localhost:8889/voluntr'
app.config['SQLALCHEMY_ECHO'] = True

db = SQLAlchemy(app)
