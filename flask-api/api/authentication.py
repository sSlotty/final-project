import uuid

from flask import request, Response, jsonify, current_app
from flask_restful import Resource
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    jwt_required,
    get_jwt_identity
)

from mongoengine import DoesNotExist

from models.oauth.error import OAuthErrorResponse
from models.oauth.token import TokenResponse
from models.users import Users
from datetime import datetime
import time


class SignUpAPI(Resource):
    # Register
    def post(self) -> Response:
        body = request.get_json()
        try:
            key = uuid.uuid4().int
            data = {
                'staffID': str(key)[0:6],
                'username': body['username'],
                'password': body['password'],
                'name': body['name'],
                'role': body['role'],
                'department': body['department'],
                'create_at': str(datetime.utcnow()),
                'update_at': str(datetime.utcnow()),
            }
            user = Users(**data)
            user.save()
            response = jsonify({"data":data,"message":"success","status":200})
            response.status_code = 201
            return response
        except Exception as e:
            response = jsonify({"data":None,"message":"error","status":204})
            response.status_code = 204
            return response


class getUserAPI(Resource):
    def get(self) -> Response:
        user = Users.objects.values_list('staffID', 'name', 'role', 'department', 'username')

        if len(user) > 0:
            response = jsonify({"data":user,"message":"success","status":200})
            response.status_code = 200
            return response
        else:
            response = jsonify({"data":None,"message":"error","status":204})
            response.status_code = 204
            return response


class getUserByIdAPI(Resource):

    def get(self) -> Response:

        staffID = request.args.get('staffID')
        user = Users.objects(staffID=staffID).values_list('staffID', 'name', 'role','username', 'department')

        if len(user) > 0:
            response = jsonify({"data":user,"message":"success","status":200})
            response.status_code = 200
            return response
        else:
            response = jsonify({"data":None,"message":"success","status":204})
            response.status_code = 204
            return response

    def put(self)->Response:
        body = request.get_json()
        user = Users.objects(staffID=body['staffID'])
        if len(user) > 0:
            Users.objects(staffID=body['staffID']).update(
                set__name=body['name'],
                set__role=body['role'],
                set__username=body['username'],
                set__update_at=str(datetime.utcnow()))
            response = jsonify({"data":body,"message":"success","status":200})
            response.status_code = 200
            return response
        else:
            response = jsonify({"data":body,"message":"error","status":400})
            response.status_code = 400
            return response


class TokenAPI(Resource):
    # Login
    def post(self) -> Response:
        body = request.get_json()
        if body.get is None or body.get is None:
            response = jsonify(
                {"data":OAuthErrorResponse(
                    "invalid_request", "The request is missing a required parameter."
                ).__dict__,"message":"success","status":400}
            )
            response.status_code = 400
            return response

        try:
            user: Users = Users.objects.get(username=body.get('username'))
            auth_success = user.check_pw_hash(body.get('password'))
            if not auth_success:
                response = jsonify(
                    {"data":OAuthErrorResponse(
                        "invalid_grant", "The username or password is incorrect."
                    ).__dict__,"message":"error","status":400}
                )
                response.status_code = 400
                return response
            else:
                print(user.id)
                return generate_token_response(str(user.id))
        except DoesNotExist:
            response = jsonify(
                {"data":OAuthErrorResponse(
                    "invalid_grant", "The username or password is incorrect."
                ).__dict__,"message":"error","status":400}
            )
        response.status_code = 400
        return response


class RefreshToken(Resource):
    # Refresh token
    @jwt_required(refresh=True)
    def post(self):
        user = get_jwt_identity()
        return generate_token_response(user)


def generate_token_response(user: str):
    # Genarate token
    access_token = create_access_token(identity=user)
    refresh_token = create_refresh_token(identity=user)
    response = jsonify(
        {"data":TokenResponse(
            access_token=access_token,
            token_type="bearer",
            expires_in=current_app.config['JWT_ACCESS_TOKEN_EXPIRES'],
            refresh_token=refresh_token,
            staffID=user
        ).__dict__,"message":"success","status":200}
    )
    response.status_code = 200
    # set_access_cookies(response, access_token)
    return response
