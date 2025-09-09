from models.ProjectTech import ProjectTechModel

from flask import make_response, session, request
from flask_restful import Resource

from config import db

class ProjectTechList(Resource):
    def get(self):
        technologies = [tech.to_dict() for tech in ProjectTechModel.query.all()]
        return technologies
    
    def post(self):
        json = request.get_json()
        breakpoint()

        if json:
            try:
                new_project_tech = ProjectTechModel(
                    project_id = json.get("projectId"),
                    tech_id = json.get("techId"),
                    front_end = json.get("frontEnd"),
                    back_end = json.get("backEnd")
                )
                db.session.add(new_project_tech)
                db.session.commit()
                return {"message": "New project tech added."}, 201
            except ValueError as e:
                return {"error": [str(e)]}
            