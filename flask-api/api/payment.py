import uuid
from datetime import datetime

from flask import request, jsonify, Response, current_app
from flask_restful import Resource
from flask_jwt_extended import jwt_required

from mongoengine import NotUniqueError, DoesNotExist
from kanpai import Kanpai

from models.payments import Payments
from models.orders import Orders
from models.dispenses import DispensesMed
from models.reports import Reports


class PaymentApi(Resource):
    def post(self) -> Response:
        body = request.get_json()
        reportID = body['reportID']
        check_bill = Payments.objects(reportID=reportID)
        print(check_bill)
        if len(check_bill) <= 0:
            calMed = calculatorMed(reportID)
            if len(calMed) > 0:
                med_sum_price = 0
                for i in calMed:
                    med_sum_price = med_sum_price + i[0]['sum_price']

                print(med_sum_price)
            else:
                med_sum_price = 0

            calOrder = orderCal(reportID)
            order_sum_price = 0
            if len(calOrder) > 0:
                order_sum_price = 0
                for j in calOrder:
                    order_sum_price = order_sum_price + j[0]['price']

                print(order_sum_price)
            else:
                order_sum_price = 0

            key = uuid.uuid4().int
            data = {
                'paymentID': str(key)[0:6],
                'reportID': reportID,
                'objOrder': calOrder,
                'objMed': calMed,
                'status': "รอชำระเงิน",
                'price': int(order_sum_price + med_sum_price),
                'create_at': datetime.utcnow(),
                'update_at': datetime.utcnow()
            }
            try:
                Payments(**data).save()
                response = jsonify(data)
                response = jsonify({"data":data,"message":"success","status":201})
                response.status_code = 201
                return response

            except NotUniqueError:
                response = jsonify({"data":None,"message":"error","status":400})
                response.status_code = 400
                return response

        else:
            response = jsonify({"data":body,"message":"ReportID does not exist","status":204})
            response.status_code = 204
            return response

    def get(self) -> Response:
        bill = Payments.objects()
        if len(bill) > 0:
            response = jsonify({"data":bill,"message":"success","status":200})
            response.status_code = 200
            return response
        else:
            response = jsonify({"data":None,"message":"document bill is null","status":204})
            response.status_code = 204
            return response


class PaymentIdAPI(Resource):

    def get(self) -> Response:
        reportID = request.args.get('reportID')
        print(reportID)
        bill = Payments.objects(reportID=reportID)
        report = Reports.objects(reportID=reportID)
        data = {
            'bill': bill,
            'report': report
        }
        print(report)
        if len(bill) > 0:
            response = jsonify({"data":data,"message":"success","status":200})
            response.status_code = 200
            return response
        else:
            response = jsonify({"data":None,"message":"error","status":204})
            response.status_code = 204
            return response

    def put(self) -> Response:

        body = request.get_json()
        reportID = body['reportID']
        bill = Payments.objects(reportID=reportID)
        if len(bill) > 0:
            Payments.objects(reportID=reportID).update(set__status="ชำระเงินสำเร็จ",
                                                       set__update_at=str(datetime.utcnow()))
            response = jsonify({"data":None,"message":"success","status":200})
            response.status_code = 200
            return response
        else:
            response = jsonify({"data":None,"message":"bill is not","status":204})
            response.status_code = 204
            return response


# class ConfPaymentBill(Resource):
#
#     def post(self) -> Response:
#
#         body = request.get_json()
#         paymentID = body['paymentID']
#         bill = Payments.objects(paymentID=paymentID)
#         if len(bill) > 0:
#             Payments.objects(paymentID=paymentID).update(set__status="ชำระเงินสำเร็จ",
#                                                          set__update_at=str(datetime.utcnow()))
#             response = jsonify(bill)
#             response.status_code = 200
#         else:
#             return Response(status=204)


def orderCal(reportID):
    pipeline = [
        {'$match': {'reportID': reportID}},
        {'$lookup':
             {'from': 'orders', 'localField': 'reportID', 'foreignField': '_id', 'as': 'orders'},
         }
    ]
    disObj = Orders.objects.aggregate(pipeline)
    x = list(disObj)
    y = list(x)
    item = list()

    if len(y) > 0:
        for data in y:
            data = [{
                'orderID': data['_id'],
                'subject': data['subject'],
                'price': data['price']
            }]
            item.append(data)

        return item
    else:
        return item


def calculatorMed(reportID):
    pipeline = [
        {'$match': {'reportID': reportID}},
        {'$lookup':
             {'from': 'medicine', 'localField': 'medID', 'foreignField': '_id', 'as': 'meds'},
         }
    ]
    disObj = DispensesMed.objects.aggregate(pipeline)
    x = list(disObj)
    y = list(x)
    item = list()

    if len(y) > 0:
        for data in y:
            amount = data['amount']
            price = data['meds'][0]['price']
            sumMeds = float(amount) * float(price)

            data = [{
                'medID': data['meds'][0]['_id'],
                'name': data['meds'][0]['name'],
                'price': data['meds'][0]['price'],
                'amount': data['amount'],
                'sum_price': sumMeds
            }]
            item.append(data)

        return item
    else:
        return item
