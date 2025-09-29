from models.BackendProject import BackEndTechModels
from flask import make_response, session, request
from flask_restful import Resource
from config import db

class BackEndProjectList(Resource):
    def get(self):
        back_end_projects = [back_end_project.to_dict() for back_end_project in BackEndTechModels.query.all()]
        return back_end_projects, 201
    
    def post(self):
        json = request.get_json()

        try:
            new_project_back_end = BackEndTechModels(
                tech_id = json.get("techId"),
                project_id = json.get("projectId")
            )
            db.session.add(new_project_back_end)
            db.session.commit()
            return {"message": "New back end tech added to project"}
        except ValueError as e:
            return{"error": [str(e)]}

class BackEndProject(Resource):
    def get(self, id):
        back_end_project = BackEndTechModels.query.filter(BackEndTechModels.id == id).first()
        if back_end_project:
            return back_end_project.to_dict(), 201
        else:
            return {"error": f"Relation {id} not found"}, 404
    
    def delete(self, id):
        back_end_project = BackEndTechModels.query.filter(BackEndTechModels.id == id).first()
        if back_end_project:
            db.session.delete(back_end_project)
            db.session.commit()
            return {"message": f"Relation {id} deleted."}, 201
        else:
            return {"error": f"Relation {id} not found"}, 404