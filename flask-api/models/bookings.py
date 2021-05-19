from mongoengine import Document, StringField, DateTimeField, BooleanField
from datetime import datetime


class Bookings(Document):
    bookingID = StringField(required=True, primary_key=True)
    patentID = StringField(required=True)
    staffID = StringField(required=True)
    detail = StringField(required=True)
    dateBooking = StringField(required=True)
    status = StringField(required=True)
    create_at = DateTimeField(required=True, default=datetime.utcnow())
    update_at = DateTimeField(required=True, default=datetime.utcnow())
