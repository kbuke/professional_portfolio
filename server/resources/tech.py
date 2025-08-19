from config import db 

from models.tech import TechModel

from flask_restful import Resource
from flask import session, request

class TechList(Resource):
    def get(self):
        tech = [tech_info.to_dict() for tech_info in TechModel.query.all()]
        return tech