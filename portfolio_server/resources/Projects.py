from flask import make_response, session, request
from flask_restful import Resource

from models.Projects import ProjectModel

from sqlalchemy.exc import IntegrityError

from config import db 

class ProjectList(Resource):
    def get(self):
        projects = [project.to_dict() for project in ProjectModel.query.all()]
        return projects
    
    def post(self):
        json = request.get_json()
        # breakpoint()
        institute_id = int(json.get("instituteId"))
        
        if json:
            try:
                new_project = ProjectModel(
                    institute_id = institute_id,
                    project_name = json.get("projectName"),
                    project_img = json.get("projectImg"),
                    project_video = json.get("projectVideo"),
                    project_start_date = json.get("projectStartDate"),
                    project_end_date = json.get("projectEndDate"),
                    project_intro = json.get("projectIntro")
                )
                db.session.add(new_project)
                db.session.commit()
                return new_project.to_dict(), 201
            
            except IntegrityError as e:
                db.session.rollback()
                if "unique_project_name" in str(e.orig):
                    return {"error": "A project with this name already exists."}, 400
                return {"error": "Database error."}, 500
            
            except ValueError as e:
                return{"error": [str(e)]}, 400

class Project(Resource):
    def get(self, id):
        project = ProjectModel.query.filter(ProjectModel.id==id).first()
        if project:
            return project.to_dict(), 201
        else:
            return {"error": f"Project {id} not found."}, 404
    
    def patch(self, id):
        data = request.get_json()

        project = ProjectModel.query.filter(ProjectModel.id == id).first()
        
        if project:
            try:
                for attr in data:
                    print(f"Setting {attr} = {data[attr]}")
                    setattr(project, attr, data[attr])
                db.session.add(project)
                db.session.commit()
                return make_response(project.to_dict(), 202)
            except ValueError as e:
                return {"error": [str(e)]}
        else:
            return {"error": f"Could not find project {id}"}, 404
        
    def delete(self, id):
        project = ProjectModel.query.filter(ProjectModel.id==id).first()
        if project:
            db.session.delete(project)
            db.session.commit()
            return {"error": f"Project {id} deleted."}, 200
        else:
            return{"error": f"Project {id} not found"}, 404
    