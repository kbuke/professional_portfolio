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
            return {"message": "New frontend project created"}, 201
        except ValueError as e:
            return {"error": [str(e)]}