from config import db 

from models.project_tech import ProjectTechModel

from flask_restful import Resource
from flask import session, request

class ProjectTechList(Resource):
    def get(self):
        project_tech = [project_tech_info.to_dict() for project_tech_info in ProjectTechModel.query.all()]
        return project_tech