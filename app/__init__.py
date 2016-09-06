import os
from flask_sqlalchemy import SQLAlchemy
from flask_assets import Environment
from flask import Flask

app = Flask(__name__, static_folder='build', static_url_path='')

db = SQLAlchemy()
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db.init_app(app)

webassets = Environment(app)

from . import assets, models, views

@app.before_first_request
def before_first_request():
    try:
        models.db.create_all()
    except Exception, e:
        app.logger.error(str(e))
