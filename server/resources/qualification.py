from config import db 

from models.qualification import QualificationModel

from flask_restful import Resource
from flask import session, request

class QualificationList(Resource):
    def get(self):
        qualifications = [qualification.to_dict() for qualification in QualificationModel.query.all()]
        return qualifications