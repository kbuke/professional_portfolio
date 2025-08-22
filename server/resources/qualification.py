from config import db 
from datetime import datetime

from models.qualification import QualificationModel
from models.institute import InstituteModel

from flask_restful import Resource
from flask import session, request, make_response

class QualificationList(Resource):
    def get(self):
        qualifications = [qualification.to_dict() for qualification in QualificationModel.query.all()]
        return qualifications
    
    def post(self):
        json=request.get_json()

        institution_id = json.get("institute_id")
        institute = InstituteModel.query.filter(InstituteModel.id==institution_id).first()

        # Handle logic for qualification dates based on the dates at institute.
        institution_start_date = institute.start_date
        institution_end_date = institute.end_date 
        
        qualification_date = json.get("date")
        qualification_date = datetime.strptime(qualification_date, "%Y-%m-%d").date()

        if institution_end_date:
            if institution_start_date <= qualification_date <= institution_end_date:
                qualification_date=qualification_date

            else:
                return{
                    "message": f"Qualification date must be between {institution_start_date} and {institution_end_date}"
                }
            
        else:
            if institution_start_date < qualification_date:
                qualification_date=qualification_date
            else:
                return{
                    "message": f"Qualification date must be after {institution_start_date}"
                }
        
        try:
            new_qualification=QualificationModel(
                title=json.get("title"),
                img_1=json.get("img_1"),
                img_2=json.get("img_2"),
                date=qualification_date,
                institute_id=institution_id
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
        return{
            "message": "Qualification not found"
        }, 404
    
    def delete(self, id):
        qualification = QualificationModel.query.filter(QualificationModel.id==id).first()
        if qualification:
            db.session.delete(qualification)
            db.session.commit()
            return{
                "message": "Qualification deleted."
            }, 201 
        return{
            "message": "Qualification not found"
        }, 404
    
    def patch(self, id):
        data=request.get_json()
        qualification = QualificationModel.query.filter(QualificationModel.id==id).first()
        if qualification:
            try:
                for attr in data:
                    setattr(qualification, attr, data[attr])
                db.session.add(qualification)
                db.session.commit()
                return make_response(qualification.to_dict(), 202)
            except ValueError as e:
                return{
                    "message": [str(e)]
                }, 400
        return{
            "message": "Qualification not found."
        }, 404