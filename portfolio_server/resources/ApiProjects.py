from models.ApiProjects import ApiProjects

from config import db 

from flask import make_response, session, request
from flask_restful import Resource

class ApiProjectList(Resource):
    def get(self):
        api_projects = [api_project.to_dict() for api_project in ApiProjects.query.all()]
        return api_projects, 200
    
    def post(self):
        json = request.get_json()
        if json:
            try:
                new_api_project = ApiProjects(
                    project_id = json.get("projectId"),
                    api_id = json.get("apiId")
                )
                db.session.add(new_api_project)
                db.session.commit()
                return new_api_project.to_dict(), 201
            except ValueError as e:
                return {"error": str[e]}
            