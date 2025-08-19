from config import db 

from models.tech import TechModel

from flask_restful import Resource
from flask import session, request, make_response

class TechList(Resource):
    def get(self):
        tech = [tech_info.to_dict() for tech_info in TechModel.query.all()]
        return tech
    
    def post(self):
        json=request.get_json()
        try:
            new_tech=TechModel(
                name=json.get("name"),
                img=json.get("img")
            )
            db.session.add(new_tech)
            db.session.commit()
            return new_tech.to_dict(), 201
        except ValueError as e:
            return{
                "message": [str(e)]
            }, 400