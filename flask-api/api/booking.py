import uuid
from re import T
from flask import request, jsonify, Response, jsonify, current_app
from flask_restful import Resource
from flask_jwt_extended import jwt_required

from mongoengine import NotUniqueError, DoesNotExist
from kanpai import Kanpai

from models.bookings import Bookings
from datetime import date, datetime

import time

from models.patients import Patients


class BookingApi(Resource):

    def get(self) -> Response:
        booking = Bookings.objects()
        if len(booking) > 0:
            response = jsonify({"data": booking,"message":"success","status":200})
            response.status_code = 200
            return response
        else:
            response = jsonify({"data":None,"message":"error","status":204})
            response.status_code = 204
            return response

    def post(self) -> Response:

        schema = Kanpai.Object({
            'bookingID': Kanpai.String().required(),
            'staffID': Kanpai.String().required(),
            'patentID': Kanpai.String().required(),
            'detail': Kanpai.String().required(),
            'dateBooking': Kanpai.String().required(),
            'status': Kanpai.String().required(),
            'create_at': Kanpai.String().required(),
            'update_at': Kanpai.String().required()
        })

        body = request.get_json()

        key = uuid.uuid4().int
        data = {
            'bookingID': str(key)[0:6],
            'staffID': body['staffID'],
            'patentID': body['patentID'],
            'detail': body['detail'],
            'dateBooking': body['dateBooking'],
            'status': "กำลังรอคิว",
            'create_at': str(datetime.utcnow()),
            'update_at': str(datetime.utcnow())
        }

        validate_result = schema.validate(data)
        if validate_result.get('success', False) is False:
            response = jsonify({"data":None,"message":"error","status":400})
            response.status_code = 400
            return response
        patent = Patients.objects(patentID=body['patentID'])
        if len(patent) > 0:
            try:

                Bookings(**data).save()
                response = jsonify({"data":data,"message":"success","status":201})
                response.status_code = 201
                return response

            except NotUniqueError:
                response = jsonify({"data":None,"message":"ID already exit.","status":400})
                response.status_code = 400
                return response

        else:
            response = jsonify({"data":None,"message":"error","status":204})
            response.status_code = 204
            return response


class BookingApiID(Resource):

    # @jwt_required()
    def get(self) -> Response:
        body = request.args.get('bookingID')
        pipline = [
            {'$match': {'_id': body}},
            {'$lookup':
                 {'from': 'patients', 'localField': 'patentID', 'foreignField': '_id', 'as': 'patients'}
             }
        ]
        booking = Bookings.objects.aggregate(pipline)
        x = list(booking)
        y = list(x)

        if len(y) > 0:
            response = jsonify({"data":y,"message":"success","status":200})
            response.status_code = 200
            return response
        else:
            response = jsonify({"data":None,"message":"error","status":204})
            response.status_code = 204
            return response


    def delete(self) -> Response:
        body = request.get_json()
        obj = Bookings.objects(bookingID=body['bookingID'])
        obj.delete()
        response = jsonify({"data":body,"message":"success","status":200})
        response.status_code = 200
        return response


    # def put(self) -> Response:
    #     body = request.get_json()
    #     booking = Bookings.objects(bookingID=body['bookingID'])
    #     if len(booking) > 0:
    #         Bookings.objects(bookingID=body['bookingID']).update(
    #             set__dateBooking=body['dateBooking'],
    #             set__status=body['status'],
    #             set__update_at=str(datetime.utcnow()))
    #         response = jsonify({"data":body,"message":"success","status":200})
    #         response.status_code = 200
    #         return response
    #     else:
    #         response = jsonify({"data":None,"message":"Booking id exit","status":204})
    #         response.status_code = 204
    #         return response


class BookingIdClose(Resource):
    def put(self) -> Response:

        body = request.get_json()
        booking = Bookings.objects(bookingID=body['bookingID'])
        if len(booking) > 0:
            Bookings.objects(bookingID=body['bookingID']).update(
                set__status="ตรวจเสร็จสิ้น",
                set__update_at=str(datetime.utcnow()))
            response = jsonify({"data":body,"message":"successfully to update bookings","status":200})
            response.status_code = 200
            return response
        else:
            response = jsonify({"data":None,"message":"booking id is exit","status":204})
            response.status_code = 204
            return response


class ConfIdBooking(Resource):
    def put(self) -> Response:
        body = request.get_json()
        booking = Bookings.objects(bookingID=body['bookingID'])
        if len(booking) > 0:
            Bookings.objects(bookingID=body['bookingID']).update(
                set__status="กำลังตรวจ",
                set__update_at=str(datetime.utcnow()))
            response = Response("Success to updated booking")
            response = jsonify({"data":body,"message":"success","status":200})
            response.status_code = 200
            return response
        else:
            response = jsonify({"data":None,"message":"booking id is exit","status":204})
            response.status_code = 204
            return response
