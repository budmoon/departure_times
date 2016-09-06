from flask import render_template
from .tools import update_departures
from .models import Departure, Stop
from . import app

@app.route('/')
def index():
    update_departures()
    northData = Departure.query.filter_by(origin = 'North Station').all()
    southData = Departure.query.filter_by(origin = 'South Station').all()
    stopData = Stop.query.distinct(Stop.stop).all()
    return render_template('index.html', departure_data = [northData, southData, stopData]);
