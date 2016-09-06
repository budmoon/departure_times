from sqlalchemy.inspection import inspect
from . import db

class Serializer(object):

    def serialize(self):
        return {c: getattr(self, c) for c in inspect(self).attrs.keys()}

    @staticmethod
    def serialize_list(l):
        return [m.serialize() for m in l]

class Departure(db.Model, Serializer):
    __tablename__ = "departures"

    id = db.Column(db.Integer(), primary_key=True)
    timestamp = db.Column(db.DateTime)
    origin = db.Column(db.String(255))
    trip = db.Column(db.Integer)
    destination = db.Column(db.String(255))
    scheduledtime = db.Column(db.DateTime)
    lateness = db.Column(db.Integer)
    track = db.Column(db.Integer)
    status = db.Column(db.String(255))

    def serialize(self):
        return Serializer.serialize(self)

class Stop(db.Model, Serializer):
    __tablename__ = "stops"

    id = db.Column(db.Integer(), primary_key=True)
    route = db.Column(db.String(255))
    direction = db.Column(db.Integer)
    sequence = db.Column(db.Integer)
    stop = db.Column(db.String(255))
    lat = db.Column(db.Float)
    long = db.Column(db.Float)
    branch = db.Column(db.String(255))

    def serialize(self):
        return Serializer.serialize(self)
