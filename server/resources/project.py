from config import db 
from datetime import datetime

from models.project import ProjectModel

from flask_restful import Resource
from flask import session, request

class ProjectList(Resource):
    def get(self):
        projects = [project.to_dict()for project in ProjectModel.query.all()]
        return projects, 200
    
    def post(self):
        json = request.get_json()

        selected_start_date = json.get("start_date")
        selected_end_date = json.get("end_date")

        if isinstance(selected_start_date, str):
            selected_start_date = datetime.strptime(selected_start_date, "%Y-%m-%d").date()
        
        if selected_end_date and isinstance(selected_end_date, str):
            selected_end_date = datetime.strptime(selected_end_date, "%Y-%m-%d").date()

            if selected_end_date <= selected_start_date:
                return{
                    "message": "error, end date can not be set before the start date."
                }
        elif selected_end_date is None:
            selected_end_date = None

        try:
            new_project = ProjectModel(
                name=json.get("name"),
                title_img=json.get("img"),
                title_video=json.get("video"),
                start_date=selected_start_date,
                end_date=selected_end_date,
                institute_id=json.get("institute_id")
            )
            db.session.add(new_project)
            db.session.commit()
            return new_project.to_dict(), 201 
        except ValueError as e:
            return{
                "message": [str(e)]
            }, 400