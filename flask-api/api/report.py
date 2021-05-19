import time
import uuid
from datetime import datetime

from flask import request, jsonify, Response, current_app
from flask_restful import Resource
from flask_jwt_extended import jwt_required

from mongoengine import *
from kanpai import Kanpai

from models.reports import Reports
from models.bookings import Bookings


class ReportAPI(Resource):

    def post(self) -> Response:
        body = request.get_json()
        booking = Bookings.objects(bookingID=body['bookingID'])
        print(len(booking))
        if len(booking) > 0:
            schema = Kanpai.Object({
                'reportID': Kanpai.String().required(),
                'bookingID': Kanpai.String().required(),
                'staffID': Kanpai.String().required(),
                'patentID': Kanpai.String().required(),
                'header': Kanpai.String().required(),
                'detail': Kanpai.String().required(),
                'create_at': Kanpai.String(),
                'update_at': Kanpai.String()
            })

            key = uuid.uuid4().int
            data = {
                'reportID': str(key)[0:6] + '_' + body['patentID'],
                'bookingID': body['bookingID'],
                'staffID': body['staffID'],
                'patentID': body['patentID'],
                'header': body['header'],
                'detail': body['detail'],
                'create_at': str(datetime.utcnow()),
                'update_at': str(datetime.utcnow())
            }

            validate_result = schema.validate(data)
            if validate_result.get('success', False) is False:
                response = jsonify({"data":None,"message":"error","status":400})
                response.status_code = 400
                return response

            try:
                Bookings.objects(bookingID=body['bookingID']).update(
                    set__status="ตรวจเสร็จสิ้น",
                    set__update_at=str(datetime.utcnow())
                )

                Reports(**data).save()
               
                response = jsonify({"data":str(key)[0:6] + '_' + body['patentID'],"message":"success","status":201})
                response.status_code = 201
                return response

            except NotUniqueError:
                response = jsonify({"data":None,"message":"ReportID already add to storage","status":400})
                response.status_code = 400
                return response
        else:
            response = jsonify({"data":None,"message":"ReportID does not exist","status":400})
            response.status_code = 400
            return response

    # Get all report
    def get(self) -> Response:
        report = Reports.objects()
        if len(report) > 0:
            response = jsonify({"data":report,"message":"success","status":200})
            response.status_code = 200
            return response

        else:
            response = jsonify({"data":None,"message":"report id null","status":400})
            response.status_code = 400
            return response


class ReportIdAPI(Resource):
    def get(self) -> Response:
        id = request.args.get('reportID')

        pipline = [
            {"$match": {"_id": id}},
            {"$lookup":
                 {'from': 'bookings', 'localField': 'bookingID', 'foreignField': '_id', 'as': 'bookings'}
             },
            {"$lookup":
                 {'from': 'users', 'localField': 'staffID', 'foreignField': '_id', 'as': 'staffs'}
             },
            {"$lookup":
                 {'from': 'patients', 'localField': 'patentID', 'foreignField': '_id', 'as': 'patients'}
             },
            {"$lookup":
                 {'from': 'dispenses_med', 'localField': '_id', 'foreignField': 'reportID', 'as': 'dispenses'}
             },
            {"$lookup":
                 {'from': 'orders', 'localField': '_id', 'foreignField': 'reportID', 'as': 'orders'}
             }
        ]

        report = Reports.objects.aggregate(pipline)
        x = list(report)
        y = list(x)

        if len(y) > 0:
            staff = y[0]['staffs']
            patient = y[0]['patients']
            booking = y[0]['bookings']
            dispenses = y[0]['dispenses']
            orders = y[0]['orders']
            data = {
                'reportID': y[0]['_id'],
                'booking': booking[0],
                'patient': patient[0],
                'staff': {
                    '_id': staff[0]['_id'],
                    'name': staff[0]['name'],
                    'role': staff[0]['role'],
                    'department': staff[0]['department']
                },
                'report': {
                    '_id': y[0]['header'],
                    'detail': y[0]['detail'],
                    'create_at': y[0]['create_at'],
                    'update_at': y[0]['update_at']
                },
                'dispenses': dispenses,
                'orders': orders

            }
            
            response = jsonify({"data":data,"message":"success","status":200})
            response.status_code = 200
            return response
        else:
            response = jsonify({"data":None,"message":"error","status":204})
            response.status_code = 204
            return response

    def delete(self) -> Response:
        body = request.get_json()
        reportObj = Reports.objects(reportID=body['reportID'])
        if len(reportObj) > 0:
            reportObj.delete()
            response = jsonify({"data":None,"message":"success","status":200})
            response.status_code = 200
            return response
        else:
            response = jsonify({"data":None,"message":"error","status":204})
            response.status_code = 204
            return response

    # def put(self) -> Response:
    #     body = request.get_json()
    #     report = Reports.objects(reportID=body['reportID'])
    #     if len(report) > 0:
    #         Reports.objects(reportID=body['reportID']).update(
    #             set__header=body['header'],
    #             set__detail=body['detail'],
    #             set__update_at=str(datetime.utcnow()))
    #         response = jsonify({"data":body,"message":"success","status":200})
    #         response.status_code = 200
    #         return response
    #     else:
    #         response = jsonify({"data":None,"message":"booking id not found","status":204})
    #         response.status_code = 204
    #         return response


class ReportsByUserID(Resource):

    def get(self) -> Response:
        id = request.args.get('patientID')
        report = Reports.objects(patentID=id)
        print(report)
        if len(report) > 0:
            response = jsonify({"data":report,"message":"Success","status":200})
            response.status_code = 200
            return response
        else:
            response = jsonify({"data":None,"message":"Patient ID is exit, Does found report","status":204})
            response.status_code = 204
            return response
