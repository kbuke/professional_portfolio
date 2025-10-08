from config import db 

from flask import make_response, session, request
from flask_restful import Resource

from models.ApiModel import ApiModel

class ApiList(Resource):
    def get(self):
        apis = [api.to_dict() for api in ApiModel.query.all()]
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

class Api(Resource):
    def get(self, id):
        api = ApiModel.query.filter(ApiModel.id == id).first()
        if api:
            return api.to_dict(), 200
        else:
            return {"error": f"Api {id} not found"}, 404
    
    def delete(self, id):
        api = ApiModel.query.filter(ApiModel.id == id).first()
        if api:
            db.session.delete(api)
            db.session.commit()
            return {"message": f"Api {id} deleted"}, 204
        else:
            return {"error": f"Api {id} not found"}
    
    def patch(self, id):
        data = request.get_json()

        api = ApiModel.query.filter(ApiModel.id == id).first()
        if api:
            try:
                for attr in data:
                    setattr(api, attr, data[attr])
                db.session.add(api)
                db.session.commit()
                return(make_response(api.to_dict(), 202))
            except ValueError as e:
                return {"error": [str(e)]}
        else:
            return {"error": f"Api {id} not found"}