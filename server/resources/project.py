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

        selected_start_date = json.get("start_date")
        selected_end_date = json.get("end_date")

        if selected_start_date:
            selected_start_date=datetime.strptime(selected_start_date, "%Y-%m-%d").date()
        else:
            return {"message": "Please enter a valid date"}
        
        if selected_end_date:
            selected_end_date=datetime.strptime(selected_end_date, "%Y-%m-%d").date()
        else:
            selected_end_date==None

        institution_id = json.get("institute_id")

        if institution_id:
            institute = InstituteModel.query.filter(InstituteModel.id==institution_id).first()

            if institute:

                institute_start_date = institute.start_date
                institute_end_date = institute.end_date

                if institute_end_date:
                    if institute_start_date <= selected_start_date <= institute_end_date:
                        selected_start_date = selected_start_date

                        if selected_end_date:
                            if selected_start_date <= selected_end_date <= institute_end_date:
                                selected_end_date = selected_end_date
                            else:
                                return{
                                    "message": f"Project end date must be between {selected_start_date} and {institute_end_date}."
                                }, 400
                        else:
                            return{
                                "message": f"The project must be finished as you left the institute on {institute_end_date}."
                            }, 400
                    else:
                        return{
                            "message": f"Project start date must be between {institute_start_date} and {institute_end_date}."
                        }, 400
                else:
                    if institute_start_date <= selected_start_date:
                        selected_start_date=selected_start_date

                        if selected_end_date:
                            if selected_start_date <= selected_end_date:
                                selected_end_date=selected_end_date
                            else:
                                return{
                                    "message": f"Project end date must be after {selected_start_date}."
                                }, 400
                        else:
                            selected_end_date=selected_end_date
                    else:
                        return{
                            "message": f"Project start date must be on or after {institute_start_date}"
                        }, 400
            else:
                return{
                    "message": f"No institute with an id of {institution_id}"
                }
        else:
            return {"message": f"Institute {institution_id} not found."}, 404

        # if institution_id:
        #     institute = InstituteModel.query.filter(InstituteModel.id==institution_id).first()
        #     institute_start_date = institute.start_date
        #     institute_end_date = institute.end_date

        #     if institute_end_date and institute_start_date and selected_end_date and selected_start_date:
        #         selected_start_date = datetime.strptime(selected_start_date, "%Y-%m-%d").date()
        #         selected_end_date = datetime.strptime(selected_end_date, "%Y-%m-%d").date()

        #         if institute_start_date <= selected_start_date <= institute_end_date:
        #             selected_start_date = selected_start_date

        #             if selected_start_date <= selected_end_date <= institute_end_date:
        #                 selected_end_date = selected_end_date
        #             else:
        #                 # selected_end_date = selected_start_date
        #                 return{"message": f"Your projects end date must be after you started it and before you finished at the institute. {selected_start_date} to {institute_end_date}"}, 400
        #         else:
        #             # selected_start_date = institute_start_date
        #             return{
        #                 "message": f"The project start date must be within the scope of institute enrollment. {institute_start_date} to {institute_end_date}"
        #             }, 400

        #     elif institute_start_date and selected_start_date and institute_end_date==None:
        #         selected_start_date=datetime.strptime(selected_start_date, "%Y-%m-%d").date()

        #         if institute_start_date <= selected_start_date:
        #             selected_start_date = selected_start_date

        #             if selected_end_date and selected_start_date <= selected_end_date:
        #                 selected_end_date = datetime.strptime(selected_end_date, "%Y-%m-%d").date()
        #             elif selected_end_date==None:
        #                 selected_end_date = None
        #             else:
        #                 # selected_end_date = selected_start_date
        #                 return{
        #                     "message": f"If you have completed the project, the completed date must be set after {selected_start_date}"
        #                 }, 400


            # if institute_start_date and institute_end_date:
            #     if isinstance(selected_start_date, str) and institute_start_date <= selected_start_date <= institute_end_date:
            #         selected_start_date=datetime.strptime(selected_start_date, "%Y-%m-%d").date()

            #         if isinstance(selected_end_date, str) and selected_start_date <= selected_end_date <= institute_end_date:
            #             selected_end_date=datetime.strptime(selected_end_date, "%Y-%m-%d").date()
            #         elif selected_end_date==None:
            #             return{"message": "This can not be true as you have finished at the institute."}
            #     else:
            #         return {"message": "Start date of project must have been in the time frame of institute enrollment."}
            #     pass
            # elif institute_start_date and institute_end_date==None:
            #     if institute_start_date <= selected_start_date and selected_start_date:
            #         selected_start_date = datetime.strptime(selected_start_date, "%Y-%m-%d").date()

            #         if selected_end_date and selected_start_date <= selected_end_date:
            #             selected_end_date=datetime.strptime(selected_end_date, "%Y-%m-%d").date()
            #         else:
            #             selected_end_date=None

            # if institute_start_date and institute_end_date:
            #     if isinstance(selected_start_date, str) and institute_start_date <= selected_start_date <= institute_end_date:
            #         selected_start_date = datetime.strptime(selected_start_date, "%Y-%m-%d").date()

            #         if isinstance(selected_end_date, str) and selected_start_date <= selected_end_date <= institute_end_date:
            #             selected_end_date = datetime.strptime(selected_end_date, "%Y-%m-%d").date()
            #         else:
            #             return {"message": "End date must come after project start date and before the institute end date."}
            #     else:
            #         return{"message": "Project start date must be between the start and end date of your institution enrollment."}
            # elif institute_start_date and institute_end_date==None:

            # breakpoint()


        # if isinstance(selected_start_date, str):
        #     selected_start_date = datetime.strptime(selected_start_date, "%Y-%m-%d").date()
        
        # if selected_end_date and isinstance(selected_end_date, str):
        #     selected_end_date = datetime.strptime(selected_end_date, "%Y-%m-%d").date()

        #     if selected_end_date <= selected_start_date:
        #         return{
        #             "message": "error, end date can not be set before the start date."
        #         }
        # elif selected_end_date is None:
        #     selected_end_date = None

        try:
            new_project = ProjectModel(
                name=json.get("name"),
                title_img=json.get("img"),
                title_video=json.get("video"),
                start_date=selected_start_date,
                end_date=selected_end_date,
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