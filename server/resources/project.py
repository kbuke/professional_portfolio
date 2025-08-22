from config import db 
from datetime import datetime

from models.project import ProjectModel
from models.institute import InstituteModel

from flask_restful import Resource
from flask import session, request, make_response

class ProjectList(Resource):
    def get(self):
        projects = [project.to_dict()for project in ProjectModel.query.all()]
        return projects, 200
    
    def post(self):
        json = request.get_json()

        project_start_date = json.get("start_date")
        project_start_date = datetime.strptime(project_start_date, "%Y-%m-%d").date()

        project_end_date = json.get("end_date")
        if project_end_date:
            project_end_date=datetime.strptime(project_end_date, "%Y-%m-%d").date()
        else:
            project_end_date=None

        # get information about the institutes, specifically when I started and ended.
        institution_id = json.get("institute_id")

        institute = InstituteModel.query.filter(InstituteModel.id==institution_id).first()
        institue_start_date = institute.start_date
        institute_end_date = institute.end_date

        # Logic for if you have left the institution.
        if institute_end_date:
            if institue_start_date <= project_start_date <= institute_end_date:
                project_start_date=project_start_date

                if project_end_date and project_start_date <= project_end_date <= institute_end_date:
                    project_end_date=project_end_date
                else:
                    return{
                        "message": f"The end date of the project must exist and be between {project_start_date} and {institute_end_date}."
                    }, 400
                
            else:
                return{
                    "message": f"You must have started the project between {institue_start_date} and {institute_end_date}."
                }, 400
        
        # Logic for if you are still enrolled at the institutiom
        else:
            if institue_start_date <= project_start_date:
                project_start_date=project_start_date

                if project_end_date and project_start_date <= project_end_date:
                    project_end_date=project_end_date 

                elif project_end_date is None:
                    project_end_date=None

                else:
                    return{
                        "message": f"The date the project finished must be on or after {project_start_date}"
                    }, 400
                
            else:
                return{
                    "message": f"The date you started the project must be on or after the {institue_start_date}."
                }, 400

        try:
            new_project = ProjectModel(
                name=json.get("name"),
                title_img=json.get("img"),
                title_video=json.get("video"),
                start_date=project_start_date,
                end_date=project_end_date,
                institute_id=institution_id
            )
            db.session.add(new_project)
            db.session.commit()
            return new_project.to_dict(), 201 
        except ValueError as e:
            return{
                "message": [str(e)]
            }, 400

class Project(Resource):
    def get(self, id):
        project = ProjectModel.query.filter(ProjectModel.id==id).first()
        if project:
            return make_response(project.to_dict(), 201)
        else:
            return{
                "message": "Project not found."
            }, 404
    
    def delete(self, id):
        project = ProjectModel.query.filter(ProjectModel.id==id).first()
        if project:
            db.session.delete(project)
            db.session.commit()
            return{
                "message": "Project deleted"
            }, 201 
        return{
            "message": "Project not found"
        }, 404
    
    def patch(self, id):
        data = request.get_json()
        project = ProjectModel.query.filter(ProjectModel.id==id).first()
        if project:
            try:
                for attr in data:
                    setattr(project, attr, data[attr])
                db.session.add(project)
                db.session.commit()
                return make_response(project.to_dict(), 202)
            except ValueError as e:
                return{
                    "message": [str(e)]
                }, 400 
        return{
            "error": "Project not found"
        }, 404