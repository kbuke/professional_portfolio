from models.ProjectPoints import ProjectPointModel

from config import db

from flask import make_response, session, request
from flask_restful import Resource

class ProjectPointsList(Resource):
    def get(self):
        points = [point.to_dict() for point in ProjectPointModel.query.all()]
        return points, 201
    
    def post(self):
        json = request.get_json()

        if json:
            try:
                new_point = ProjectPointModel(
                    project_point = json.get("projectPoint"),
                    project_id = json.get("projectId")
                )
                db.session.add(new_point)
                db.session.commit()
                return {"message": "New project point posted."}
            except ValueError as e:
                return {"error": [str(e)]}