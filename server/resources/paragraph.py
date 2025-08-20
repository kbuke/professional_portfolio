from config import db 

from models.paragraph import ParagraphModel

from flask_restful import Resource
from flask import session, request, make_response

class ParagraphList(Resource):
    def get(self):
        paragraphs = [paragraph.to_dict()for paragraph in ParagraphModel.query.all()]
        return paragraphs, 200
    
    def post(self):
        json = request.get_json()

        try:
            new_paragraph = ParagraphModel(
                title=json.get("title"),
                text=json.get("text"),
                img_1=json.get("img_1"),
                img_2=json.get("img_2"),
                project_id=json.get("project_id")
            )
            db.session.add(new_paragraph)
            db.session.commit()
            return new_paragraph.to_dict(), 201
        except ValueError as e:
            return{
                "message": [str(e)]
            }, 400

class Paragraph(Resource):
    def get(self, id):
        paragraph = ParagraphModel.query.filter(ParagraphModel.id==id).first()
        if paragraph:
            return make_response(paragraph.to_dict(), 201)
        else:
            return{
                "message": "Paragraph not found"
            }, 404 
        
    def delete(self, id):
        paragraph = ParagraphModel.query.filter(ParagraphModel.id==id).first()
        if paragraph:
            db.session.delete(paragraph)
            db.session.commit()
            return{
                "message": "Paragraph deleted"
            }, 200
        return{
            "message": "Paragraph not found."
        }, 404
    
    def patch(self, id):
        data = request.get_json()
        paragraph = ParagraphModel.query.filter(ParagraphModel.id==id).first()
        if paragraph:
            try:
                for attr in data:
                    setattr(paragraph, attr, data[attr])
                db.session.add(paragraph)
                db.session.commit()
                return make_response(paragraph.to_dict(), 202)
            except ValueError as e:
                return{
                    "message": [str(e)]
                }, 400
        return{
            "error": "Paragraph not found."
        }, 404