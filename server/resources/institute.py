from config import db 

from models.institute import InstituteModel

from flask_restful import Resource
from flask import session, request

class InstituteList(Resource):
    def get(self):
        institutes = [institute.to_dict()for institute in InstituteModel.query.all()]
        return institutes, 200