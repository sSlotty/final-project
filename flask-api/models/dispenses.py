from datetime import datetime

from mongoengine import Document, StringField, DateTimeField, ObjectIdField,ListField,ReferenceField


class Dispenses(Document):
    dispenseID = StringField(required=True, primary_key=True)
    reportID = StringField(required=True)
    staffID = StringField(required=True)
    med_obj = ListField(ReferenceField('medicineID'))


class DispensesMed(Document):
    dispenseMedID = StringField(required=True, primary_key=True)
    reportID = StringField(required=True)
    medID = StringField(required=True)
    amount = StringField(required=True)
    status = StringField(required=True)
    create_at = DateTimeField(required=False, default=datetime.utcnow())
    update_at = DateTimeField(required=False, default=datetime.utcnow())
