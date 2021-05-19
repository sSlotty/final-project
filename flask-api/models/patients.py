from datetime import datetime

from mongoengine import Document, StringField, EmailField, DateTimeField


class Patients(Document):
    patentID = StringField(required=True, primary_key=True)
    name = StringField(required=True, unique=True)
    dob = DateTimeField(required=True, default=datetime.utcnow())
    tel = StringField(required=True)
    email = EmailField(required=True)
    job = StringField(required=True)
    create_at = StringField(required=True)
    update_at = StringField(required=True)
