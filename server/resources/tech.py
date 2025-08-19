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

class Tech(Resource):
    def get(self, id):
        tech=TechModel.query.filter(TechModel.id==id).first()
        if tech:
            return make_response(tech.to_dict(), 201)
        else:
            return{
                "message": "Tech could not be found."
            }, 404
    
    def delete(self, id):
        tech=TechModel.query.filter(TechModel.id==id).first()
        if tech:
            db.session.delete(tech)
            db.session.commit()
            return{
                "message": "tech deleted"
            }, 200 
        return{
            "message": "Tech not found"
        }, 404