from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['DEBUG'] = True      # displays runtime errors in the browser, too
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://voluntr:voluntr@localhost:8889/voluntr'
app.config['SQLALCHEMY_ECHO'] = True
app.secret_key = 'dgts027a46710270f5ab170a2dde79da4da52482f3d5gd10'

db = SQLAlchemy(app)