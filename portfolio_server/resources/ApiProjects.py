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
        print("Incoming JSON:", json)  # visible in console

        if json:
            try:
                new_api_project = ApiProjects(
                    project_id = json.get("projectId"),
                    tech_id = json.get("techId")
                )
                print("Created ApiProjects instance:", new_api_project)

                db.session.add(new_api_project)
                db.session.commit()
                print("Committed successfully!")
                return new_api_project.to_dict(), 201

            except Exception as e:
                import traceback
                traceback.print_exc()
                return {"error": str(e)}, 400


class ApiProject(Resource):
    def get(self, id):
        api_project = ApiProjects.query.filter(ApiProjects.id == id).first()
        if api_project:
            return api_project.to_dict(), 201
        else:
            return{"error": f"Api Project relation not found"}, 404
    
    def delete(self, id):
        api_project = ApiProjects.query.filter(ApiProjects.id == id).first()
        if api_project:
            db.session.delete(api_project)
            db.session.commit()
            return {"message": f"Project {id} deleted"}, 200
        else:
            return{"error": f"Project {id} is not on this app"}, 404
            