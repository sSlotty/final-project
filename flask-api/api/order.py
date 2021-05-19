import uuid
from datetime import datetime

from flask import request, jsonify, Response, current_app
from flask_restful import Resource
from flask_jwt_extended import jwt_required

from mongoengine import NotUniqueError, DoesNotExist
from kanpai import Kanpai

from models.orders import Orders
from models.reports import Reports


class OrderApi(Resource):

    def post(self) -> Response:
        body = request.get_json()
        id = body.get('reportID')
        report = Reports.objects(reportID=id)
        if len(report) > 0:
            for i in body.get('order'):
                key = uuid.uuid4().int
                data = {
                    'orderID': str(key)[0:6],
                    'reportID': i['reportID'],
                    'subject': i['subject'],
                    'price': i['price'],
                    'staffID': i['staffID'],
                    'create_at': str(datetime.utcnow()),
                    'update_at': str(datetime.utcnow())
                }
                Orders(**data).save()
            response = jsonify({"data":None,"message":"successfully to create order","status":201})
            response.status_code = 201
            return response
        else:
            response = jsonify({"data":None,"message":"Report ID does not exist","status":204})
            response.status_code = 204
            return response

    def get(self) -> Response:
        order = Orders.objects.distinct(field="reportID")
        if len(order) > 0:
            response = jsonify({"data":order,"message":"success","status":200})
            response.status_code = 200
            return response
        else:
            response = jsonify({"data":None,"message":"error","status":204})
            response.status_code = 204
            return response

    def delete(self) -> Response:
        body = request.get_json()
        id = body['orderID']
        order = Orders.objects(orderID=id)
        if len(order) > 0:
            order.delete()
            response = jsonify({"data":None,"message":"success","status":200})
            response.status_code = 200
            return response
        else:
            response = jsonify({"data":None,"message":"error","status":204})
            response.status_code = 204
            return response


class SearchOrderByReport(Resource):

    def get(self) -> Response:
        id = request.args.get('reportID')
        order = Orders.objects(reportID=id)
        if len(order) > 0:
            response = jsonify({"data":order,"message":"success","status":200})
            response.status_code = 200
            return response
        else:
            response = jsonify({"data":None,"message":"report id not found","status":204})
            response.status_code = 204
            return response
