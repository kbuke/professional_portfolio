from config import db 

from models.point import PointModel

from flask_restful import Resource
from flask import session, request

class PointsList(Resource):
    def get(self):
        points = [point.to_dict() for point in PointModel.query.all()]
        return points, 200
    
    def post(self):
        json = request.get_json()

        try:
            new_post = PointModel(
                point=json.get("point"),
                project_id=json.get("project_id")
            )
            db.session.add(new_post)
            db.session.commit()
            return new_post.to_dict(), 201
        except ValueError as e:
            return{
                "message": [str(e)]
            }, 400