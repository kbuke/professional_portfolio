from config import db 

from models.paragraph import ParagraphModel

from flask_restful import Resource
from flask import session, request

class ParagraphList(Resource):
    def get(self):
        paragraphs = [paragraph.to_dict()for paragraph in ParagraphModel.query.all()]
        return paragraphs, 200