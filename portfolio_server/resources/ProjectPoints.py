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
                return new_point.to_dict(), 201
            except ValueError as e:
                return {"error": [str(e)]}

class ProjectPoint(Resource):
    def get(self, id):
        point = ProjectPointModel.query.filter(ProjectPointModel.id == id).first()
        if point:
            return point.to_dict(), 201
        else:
            return {"error": f"Point {id} not found"}, 404
    
    def patch(self, id):
        data = request.get_json()

        point = ProjectPointModel.query.filter(ProjectPointModel.id == id).first()

        if point:
            try:
                for attr in data:
                    setattr(point, attr, data[attr])
                db.session.add(point)
                db.session.commit()
                return {"message": f"Successfully edited point {id}"}
            except ValueError as e:
                return {"error": [str(e)]}
        else:
            return {"error": f"Point {id} not found."}, 404
    
    def delete(self, id):
        point = ProjectPointModel.query.filter(ProjectPointModel.id == id).first()
        if point:
            db.session.delete(point)
            db.session.commit()
            return {"message": f"Point {id} deleted."}, 201
        else:
            return {"error": f"Point {id} not found"}, 404
