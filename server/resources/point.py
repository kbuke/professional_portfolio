from config import db 

from models.point import PointModel

from flask_restful import Resource
from flask import session, request

class PointsList(Resource):
    def get(self):
        points = [point.to_dict() for point in PointModel.query.all()]
        return points, 200