from config import db 
from datetime import datetime

from models.qualification import QualificationModel

from flask_restful import Resource
from flask import session, request, make_response

class QualificationList(Resource):
    def get(self):
        qualifications = [qualification.to_dict() for qualification in QualificationModel.query.all()]
        return qualifications
    
    def post(self):
        json=request.get_json()
        
        selected_date = json.get("date")
        if isinstance(selected_date, str):
            selected_date=datetime.strptime(selected_date, "%Y-%m-%d").date()
        
        try:
            new_qualification=QualificationModel(
                title=json.get("title"),
                img_1=json.get("img_1"),
                img_2=json.get("img_2"),
                date=selected_date,
                institute_id=json.get("institute_id")
            )
            db.session.add(new_qualification)
            db.session.commit()
            return new_qualification.to_dict(), 201
        except ValueError as e:
            return{
                "message": [str(e)]
            }, 400

class Qualification(Resource):
    def get(self, id):
        qualification = QualificationModel.query.filter(QualificationModel.id==id).first()
        if qualification:
            return make_response(qualification.to_dict(), 201)