from models.CloudProjectModel import CloudProjectModel
from config import db 

from flask import make_response, session, request
from flask_restful import Resource

class CloudProjectList(Resource):
    def get(self):
        cloud_projects = [project.to_dict() for project in CloudProjectModel.query.all()]
        return cloud_projects, 201 
    
    def post(self):
        json = request.get_json()
        if json:
            try:
                new_cloud_project = CloudProjectModel(
                    project_id = json.get("projectId"),
                    tech_id = json.get("techId")
                )
                db.session.add(new_cloud_project)
                db.session.commit()
                return new_cloud_project.to_dict(), 201 
            except ValueError as e:
                return {"error": [str(e)]}, 400 

class CloudProject(Resource):
    def get(self, id):
        project = CloudProjectModel.query.filter(CloudProjectModel.id == id).first()
        if project:
            return project.to_dict(), 201 
        else:
            return {"error": f"Project {id} not found"}
    
    def patch(self, id):
        data = request.get_json()

        project = CloudProjectModel.query.filter(CloudProjectModel.id == id).first()
        if project:
            try:
                for attr in data:
                    setattr(project, attr, data[attr])
                db.session.add(project)
                db.session.commit()
                return make_response(project.to_dict(), 202)
            except ValueError as e:
                return {"error": [str(e)]}
        else:
            return {"error": f"Project {id} not found"}, 404
    
    def delete(self, id):
        project = CloudProjectModel.query.filter(CloudProjectModel.id == id).first()
        if project:
            db.session.delete(project)
            db.session.commit()
            return {"message": f"Project {id} deleted"}, 200
        else:
            return {"message": f"Project {id} not found"}, 404
        