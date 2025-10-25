from config import db
from flask import session, make_response, request
from flask_restful import Resource
from models.FrontendProject import FrontEndProjectModel

class FrontEndProjectList(Resource):
    def get(self):
        front_end_projects = [front_end_project.to_dict() for front_end_project in FrontEndProjectModel.query.all()]
        return front_end_projects
    
    def post(self):
        json = request.get_json()
        try:
            new_front_end_project = FrontEndProjectModel(
                project_id = json.get("projectId"),
                tech_id = json.get("techId")
            )
            db.session.add(new_front_end_project)
            db.session.commit()
            return new_front_end_project.to_dict(), 201
        except ValueError as e:
            return {"error": [str(e)]}

class FrontEndTech(Resource):
    def delete(self, id):
        tech = FrontEndProjectModel.query.filter(FrontEndProjectModel.id==id).first()
        if tech:
            db.session.delete(tech)
            db.session.commit()
            return {"message": f"Tech {id} deleted"}, 201
        else:
            return {"error": f"Tech {id} not found"}, 404