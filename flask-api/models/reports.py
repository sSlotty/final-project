from datetime import datetime

from mongoengine import Document, StringField, DateTimeField, ObjectIdField


class Reports(Document):
    reportID = StringField(required=True, primary_key=True)
    bookingID = StringField(required=True)
    staffID = StringField(required=True)
    patentID = StringField(required=True)
    header = StringField(required=True)
    detail = StringField(required=True)
    create_at = DateTimeField(required=False, default=datetime.utcnow())
    update_at = DateTimeField(required=False, default=datetime.utcnow())
