from models.Technology import TechnologyModel

from flask import session, make_response, request
from flask_restful import Resource

from config import db

class TechnologyList(Resource):
    def get(self):
        technologies = [technology.to_dict() for technology in TechnologyModel.query.all()]
        return technologies, 200
    
    def post(self):
        json = request.get_json()

        if json:
            try:
                new_tech = TechnologyModel(
                    tech_name = json.get("techName"),
                    tech_img = json.get("techImg")
                )
                db.session.add(new_tech)
                db.session.commit()
                return new_tech.to_dict(), 201
            except ValueError as e:
                return {"error": [str(e)]}

class Technology(Resource):
    def delete(self, id):
        tech = TechnologyModel.query.filter(TechnologyModel.id == id).first()
        if tech:
            db.session.delete(tech)
            db.session.commit()
            return {"error": f"Tech {id} deleted."}, 200
        else:
            return {"error": f"Tech {id} not found"}, 404
    
    def patch(self, id):
        data = request.get_json()

        tech = TechnologyModel.query.filter(TechnologyModel.id == id).first()
        if tech:
            try:
                for attr in data:
                    setattr(tech, attr, data[attr])
                db.session.add(tech)
                db.session.commit()
                return make_response(tech.to_dict(), 202)
            except ValueError as e:
                return {"error": [str(e)]}
        else:
            return{"error": f"Tech {id} not found"}, 404
            