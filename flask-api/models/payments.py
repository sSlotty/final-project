from datetime import datetime

from mongoengine import Document, ListField ,DecimalField, StringField, DateTimeField, ObjectIdField


class Payments(Document):
    paymentID = StringField(required=True, primary_key=True)
    reportID = StringField(required=True)
    objMed = ListField(required=False)
    objOrder = ListField(required=False)
    price = DecimalField(required=True)
    status = StringField(required=True)
    create_at = DateTimeField(required=False, default=datetime.utcnow())
    update_at = DateTimeField(required=False, default=datetime.utcnow())
