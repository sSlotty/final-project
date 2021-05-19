import uuid
from datetime import datetime

from flask import request, jsonify, Response, current_app
from flask_restful import Resource
from flask_jwt_extended import jwt_required

from mongoengine import NotUniqueError, DoesNotExist
from kanpai import Kanpai

from models.reports import Reports
from models.dispenses import Dispenses, DispensesMed
from models.medicines import Medicine


class DispenseApi(Resource):
    def post(self) -> Response:
        body = request.get_json()
        report_ID = body['reportID']
        report = Reports.objects(reportID=report_ID)
        if len(report) > 0:
            for data in body.get('meds_ref'):

                medObj = Medicine.objects.get(medicineID=data['med_id'])
                key = uuid.uuid4().int
                if (data['med_id'] == medObj.medicineID) and (medObj.amount - data['med_amount'] >= 0):
                    amount = int(medObj.amount - data['med_amount'])
                    Medicine.objects(medicineID=data['med_id']).update(
                        set__amount=amount,
                        set__update_at=str(datetime.utcnow())
                    )
                    print(amount)
                    queryDisensesMed = {
                        'dispenseMedID': str(key)[0:7],
                        'reportID': report_ID,
                        'medID': data['med_id'],
                        'status': "รอรับยา",
                        'amount': str(data['med_amount']),
                        'create_at': str(datetime.utcnow()),
                        'update_at': str(datetime.utcnow())
                    }

                    DispensesMed(**queryDisensesMed).save()
                    
                else:
                    return Response(status=204)

            response = jsonify({"data":None,"message":"success","status":200})
            response.status_code = 200
            return response
        else:
            response = jsonify({"data":None,"message":"Report id exit","status":204})
            response.status_code = 204
            return response

    def get(self) -> Response:
        disObj = DispensesMed.objects.distinct(field='reportID')
        if len(disObj) > 0:
            response = jsonify({"data":disObj,"message":"success","status":200})
            response.status_code = 200
            return response
        else:
            response = jsonify({"data":None,"message":"error","status":204})
            response.status_code = 204
            return response

    def delete(self) -> Response:
        body = request.get_json()
        reportID = body['reportID']
        obj = DispensesMed.objects(reportID=reportID)
        if len(obj) > 0:
            obj.delete()
            response = jsonify({"data":None,"message":"success","status":200})
            response.status_code = 200
            return response
        else:
            response = jsonify({"data":None,"message":"ReportID does not exist","status":204})
            response.status_code = 204
            return response


class DispensesIdAPI(Resource):
    def get(self) -> Response:
        reportID = request.args.get('reportID')

        pipline = [
            {'$match': {'reportID': reportID}},
            {'$lookup':
                 {'from': 'medicine', 'localField': 'medID', 'foreignField': '_id', 'as': 'meds'}
             }
        ]
        disObj = DispensesMed.objects.aggregate(pipline)
        x = list(disObj)
        y = list(x)
        if len(y) > 0:
            response = jsonify({"data":y,"message":"success","status":200})
            response.status_code = 200
            return response
        else:
            response = jsonify({"data":None,"message":"reportID does not exist","status":204})
            response.status_code = 204
            return response


class ConfDispenses(Resource):

    def post(self) -> Response:
        body = request.get_json()
        reportID = body['reportID']
        obj = DispensesMed.objects(reportID=reportID)
        if len(obj) > 0:
            DispensesMed.objects(reportID=reportID).update(
                set__status="จ่ายยาสำเร็จ",
                set__update_at=str(datetime.utcnow())
            )
            response = jsonify({"data":body,"message":"success","status":200})
            response.status_code = 200
            return response
        else:
            response = jsonify({"data":None,"message":"reportID does not exist","status":204})
            response.status_code = 204
            return response
