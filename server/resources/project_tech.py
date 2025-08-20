from config import db 

from models.project_tech import ProjectTechModel

from flask_restful import Resource
from flask import session, request, make_response

class ProjectTechList(Resource):
    def get(self):
        project_tech = [project_tech_info.to_dict() for project_tech_info in ProjectTechModel.query.all()]
        return project_tech
    
    def post(self):
        json=request.get_json()
        try:
            new_project_tech = ProjectTechModel(
                project_id=json.get("project_id"),
                tech_id=json.get("tech_id")
            )
            db.session.add(new_project_tech)
            db.session.commit()
            return new_project_tech.to_dict(), 201
        except ValueError as e:
            return{
                "message": [str(e)]
            }, 400