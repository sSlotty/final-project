from mongoengine import Document, StringField, DateTimeField, DecimalField
from datetime import date, datetime


class Medicine(Document):
    medicineID = StringField(required=True, primary_key=True)
    name = StringField(required=True)
    amount = DecimalField(required=True, default=0, MinValue=0, rounding='ROUND_HALF_UP')
    lot_num = StringField(required=True)
    MFG = StringField(required=True)
    EXP = StringField(required=True, NotNull=True)
    price = DecimalField(required=True, default=0, MinValue=0, rounding='ROUND_HALF_UP')
    create_at = DateTimeField(required=False, default=datetime.utcnow())
    update_at = DateTimeField(required=False, default=datetime.utcnow())
