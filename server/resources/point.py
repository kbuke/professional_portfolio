from config import db 

from models.point import PointModel

from flask_restful import Resource
from flask import session, request, make_response

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

class Points(Resource):
    def get(self, id):
        point = PointModel.query.filter(PointModel.id==id).first()
        if point:
            return make_response(point.to_dict(), 201)
        else:
            return{
                "message": "Point not found"
            }, 404
    
    def delete(self, id):
        point = PointModel.query.filter(PointModel.id==id).first()
        if point:
            db.session.delete(point)
            db.session.commit()
            return{
                "message": "Point deleted"
            }, 201
        return{
            "message": "Could not find point"
        }, 404
    
    def patch(self, id):
        data = request.get_json()
        point = PointModel.query.filter(PointModel.id==id).first()
        if point:
            try:
                for attr in data:
                    setattr(point, attr, data[attr])
                db.session.add(point)
                db.session.commit()
                return make_response(point.to_dict())
            except ValueError as e:
                return{
                    "message": [str(e)]
                }, 400 
        return{
            "message": "Point not found."
        }, 404