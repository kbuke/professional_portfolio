from flask import session, request, make_response
from flask_restful import Resource

from config import db 

from models.ProjectParagraphs import ProjectParagraphModel

class ProjectParagraphList(Resource):
    def get(self):
        paragraphs = [paragraph.to_dict() for paragraph in ProjectParagraphModel.query.all()]
        return paragraphs
    
    def post(self):
        json = request.get_json()
        if json:
            try:
                new_paragraph = ProjectParagraphModel(
                    paragraph = json.get("paragraph"),
                    paragraph_img_1 = json.get("paraImg1"),
                    paragraph_img_2 = json.get("paraImg2"),
                    project_id = json.get("projectId")
                )
                db.session.add(new_paragraph)
                db.session.commit()
                return {"message": "New paragraph updated"}, 201
            except ValueError as e:
                return {"error": [str(e)]}