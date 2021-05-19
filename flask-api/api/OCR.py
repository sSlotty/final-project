import requests
import base64
import json
from flask import request, jsonify, Response, jsonify, current_app
from flask_restful import Resource


class OCRAPI(Resource):
    def post(self) -> Response:
        body = request.get_json()
        imgBase64 = body['img']
        if len(imgBase64) > 0:
            # with open("../E0B884E0B8B3E0B984E0B897E0B8A2E0B981E0B897E0B989-2.png", "rb") as img_file:
            #     img = base64.b64encode(img_file.read())
            # print(type(img))
            URL = 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDQEclG_b9_y6MfjVkACZEqotA9b2AJ6wA'
            payload = {
                "requests": [
                    {
                        "image": {
                            "content": imgBase64
                        },
                        "features": [{"type": "TEXT_DETECTION"}]
                    }
                ]
            }
            res = requests.post(url=URL, json=payload)
        
            if res.status_code == 200:
                data = res.json()
                
                response = jsonify({"data": data['responses'], "message": "success", "status": 200})
                response.status_code = 200
                return response
            else:
                response = jsonify({"data": None, "message": "error", "status": res.status_code})
                response.status_code = res.status_code
                return response
        else:
            response = jsonify({"data": None, "message": "missing img key", "status": 400})
            response.status_code = 400
            return response
