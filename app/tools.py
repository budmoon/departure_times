import os
import requests, tablib
from datetime import datetime
from .models import Departure, Stop
from . import db

def update_departures():
    current = 0;

    data = tablib.Dataset()
    data.csv = requests.get('http://developer.mbta.com/lib/gtrtfs/Departures.csv').content

    if current != datetime.utcfromtimestamp(int(data[0][0])):
        db.session.query(Departure).delete()
        # if current == 0:
        #     db.session.query(Stop).delete()
        #     cursor = db.session.connection().connection.cursor()
        #     f = open(os.getcwd() + '/app/build/data/StationOrder.csv')
        #     cursor.copy_from(f, 'stops', ',')
        for i in data:
            current = datetime.utcfromtimestamp(int(i[0]))
            record = Departure(**{
                 'timestamp'     : current
                ,'origin'        : i[1]
                ,'trip'          : i[2]
                ,'destination'   : i[3]
                ,'scheduledtime' : datetime.utcfromtimestamp(int(i[4]))
                ,'lateness'      : i[5] if i[5] else 0
                ,'track'         : i[6] if i[6] else 0
                ,'status'        : i[7]
            })
            db.session.add(record)

    db.session.commit()
