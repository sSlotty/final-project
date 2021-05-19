import uuid
from re import T
from flask import request, jsonify, Response, jsonify, current_app
from flask_restful import Resource
from flask_jwt_extended import jwt_required

from mongoengine import NotUniqueError, DoesNotExist
from kanpai import Kanpai

from models.medicines import Medicine
from datetime import date, datetime

import time


class MedicineApi(Resource):

    def get(self) -> Response:
        medicine = Medicine.objects()
        if len(medicine) > 0:
            response = jsonify({"data":medicine,"message":"success","status":200})
            response.status_code = 200
            return response
        else:
            response = jsonify({"data":None,"message":"Medicine is null","status":204})
            response.status_code = 204
            return response

    def post(self) -> Response:

        schema = Kanpai.Object({
            'medicineID': Kanpai.String().required(),
            'name': Kanpai.String().required(),
            'amount': Kanpai.String().required(),
            'lot_num': Kanpai.String().required(),
            'MFG': Kanpai.String().required(),
            'EXP': Kanpai.String().required(),
            'price': Kanpai.String().required(),
            'create_at': Kanpai.String().required(),
            'update_at': Kanpai.String().required()
        })

        body = request.get_json()
        today = date.today()

        key = uuid.uuid4().int
        data = {
            'medicineID': str(key)[0:6],
            'name': body['name'],
            'amount': body['amount'],
            'lot_num': body['lot_num'],
            'MFG': body['MFG'],
            'EXP': body['EXP'],
            'price': body['price'],
            'create_at': str(datetime.utcnow()),
            'update_at': str(datetime.utcnow())
        }

        validate_result = schema.validate(data)
        if validate_result.get('success', False) is False:
            print(data)
            response = jsonify({"data":data,"message":"Error","status":400})
            response.status_code = 400
            return response

        try:

            Medicine(**data).save()
            response = jsonify({"data":data,"message":"success","status":201})
            response.status_code = 201
            return response

        except NotUniqueError:
            response = jsonify({"data":None,"message":"Already have Medicine ID","status":400})
            response.status_code = 400
            return response


class MedicineApiID(Resource):

    # @jwt_required()
    def get(self) -> Response:
        body = request.args.get('medicineID')
        med = Medicine.objects(medicineID=body)
        if len(med) > 0:
            response = jsonify({"data":med,"message":"success","status":200})
            response.status_code = 200
            return response
        else:
            response = jsonify({"data":None,"message":"Medicine is null","status":204})
            response.status_code = 204
            return response

    def delete(self) -> Response:
        body = request.get_json()
        obj = Medicine.objects(medicineID=body['medicineID'])
        obj.delete()
        response = jsonify({"data":None,"message":"success","status":200})
        response.status_code = 200
        return response

    def put(self) -> Response:
        today = date.today()
        body = request.get_json()
        med = Medicine.objects(medicineID=body['medicineID'])
        if len(med) > 0:
            Medicine.objects(medicineID=body['medicineID']).update(
                set__amount=body['amount'],
                set__update_at=str(datetime.utcnow()))
            response = jsonify({"data":body,"message":"successfully to update medicineID","status":200})
            response.status_code = 200
            return response
        else:
            response = jsonify({"data":None,"message":"Medicine Id not found","status":400})
            response.status_code = 400
            return response
