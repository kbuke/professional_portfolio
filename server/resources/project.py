from config import db 

from models.project import ProjectModel

from flask_restful import Resource
from flask import session, request

class ProjectList(Resource):
    def get(self):
        projects = [project.to_dict()for project in ProjectModel.query.all()]
        return projects, 200