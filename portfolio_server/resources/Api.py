from config import db 

from flask import make_response, session, request
from flask_restful import Resource

from models.ApiModel import ApiModel

class ApiList(Resource):
    def get(self):
        apis = [api.to_dict for api in ApiModel.query.all()]
        return apis

    def post(self):
        json = request.get_json()
        if json:
            try:
                new_api = ApiModel(
                    name = json.get("apiName"),
                    img = json.get("apiImg")
                )
                db.session.add(new_api)
                db.session.commit()
                return new_api.to_dict(), 201
            except ValueError as e:
                return{"error": [str(e)]}