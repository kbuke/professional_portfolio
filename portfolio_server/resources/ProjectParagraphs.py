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

class Paragraph(Resource):
    def get(self, id):
        paragraph = ProjectParagraphModel.query.filter(ProjectParagraphModel.id == id).first()
        if paragraph:
            return paragraph.to_dict(), 201
        else:
            return {"error": f"Paragraph {id} not found."}, 404
    
    def patch(self, id):
        paragraph = ProjectParagraphModel.query.filter(ProjectParagraphModel.id == id).first()
        data = request.get_json()

        if paragraph:
            try:
                for attr in data:
                    setattr(paragraph, attr, data[attr])
                db.session.add(paragraph)
                db.session.commit()
                return {"message": f"Updated paragraph {id}"}, 201
            except ValueError as e:
                return {"error": [str(e)]}
        else:
            return {"error": f"Paragraph {id} not found"}, 404
    
    def delete(self, id):
        paragraph = ProjectParagraphModel.query.filter(ProjectParagraphModel.id == id).first()
        if paragraph:
            db.session.delete(paragraph)
            db.session.commit()
            return {"error": f"Paragraph {id} deleted"}, 201
        else:
            return {"error": f"Paragraph {id} not found"}, 404