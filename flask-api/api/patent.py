import uuid
import datetime

from flask import request, Response, jsonify, current_app
from flask_restful import Resource
from flask_jwt_extended import jwt_required

from mongoengine import NotUniqueError, DoesNotExist
from kanpai import Kanpai

from models.patients import Patients
from datetime import date



class PatentApi(Resource):
    # @jwt_required()
    def get(self) -> Response:
        patent = Patients.objects()
        if len(patent) > 0:
            response = jsonify({"data":patent,"message":"success","status":200})
            response.status_code = 200
            return response
        else:
            response = jsonify({"data":None,"message":"success","status":204})
            response.status_code = 204
            return response

    # @jwt_required()
    def post(self) -> Response:

        body = request.get_json()
        today = date.today()

        key = uuid.uuid4().int
        data = {
            'patentID': str(key)[0:6],
            'name': body['name'],
            'dob': datetime.datetime.strptime(body['dob'], "%Y-%m-%dT%H:%M:%S.%f%z"),
            'tel': body['tel'],
            'email': body['email'],
            'job': body['job'],
            'create_at': str(today.strftime("%d/%m/%Y")),
            'update_at': str(today.strftime("%d/%m/%Y"))
        }
        print(data)


        try:
            Patients(**data).save()
            response = jsonify({"data":data,"message":"success","status":201})
            response.status_code = 201
            return response

        except NotUniqueError:
            response = jsonify({"data":None,"message":"error","status":400})
            response.status_code = 400
            return response


class PatentApiID(Resource):

    # @jwt_required()
    def get(self) -> Response:

        patentID = request.args.get('patentID')
        patent = Patients.objects(patentID=patentID)
        if len(patent) > 0:
            response = jsonify({"data":patent,"message":"success","status":200})
            response.status_code = 200
            return response
        else:
            response = jsonify({"data":None,"message":"error","status":204})
            response.status_code = 204
            return response

    def delete(self) -> Response:
        body = request.get_json()
        obj = Patients.objects(patentID=body['patentID'])
        obj.delete()
        response = jsonify({"data":None,"message":"success","status":200})
        response.status_code = 200
        return response

    def put(self) -> Response:
        today = date.today()
        body = request.get_json()
        patent = Patients.objects(patentID=body['patentID'])
        if len(patent) > 0:
            Patients.objects(patentID=body['patentID']).update(set__name=body['name'], set__dob=datetime.datetime.strptime(body['dob'], "%Y-%m-%dT%H:%M:%S.%f%z"),
                                                                    set__tel=body['tel'], set__email=body['email'],
                                                                    set__job=body['job'],
                                                                    set__update_at=str(today.strftime("%d/%m/%Y")))
            
            response = jsonify({"data":body,"message":"success","status":200})
            response.status_code = 200
            return response
        else:
            response = jsonify({"data":body,"message":"Patient id does not exist","status":400})
            response.status_code = 400
            return response
