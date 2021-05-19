from mongoengine import Document, DecimalField, StringField, DateTimeField, ObjectIdField


class Orders(Document):
    orderID = StringField(required=True, primary_key=True)
    reportID = StringField(required=True)
    subject = StringField(required=True)
    price = DecimalField(required=True)
    staffID = StringField(required=True)
    create_at = StringField(required=False)
    update_at = StringField(required=False)
