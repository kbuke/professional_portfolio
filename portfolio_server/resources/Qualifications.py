from flask import session, make_response, request
from flask_restful import Resource

from config import db 

from models.Qualification import QualificationModel

class QualificationList(Resource):
    def get(self):
        qualifications = [qualification.to_dict() for qualification in QualificationModel.query.all()]
        return qualifications, 201
    
    def post(self):
        json = request.get_json()

        if json:
            try:
                new_qualification = QualificationModel(
                    qualification = json.get("qualification"),
                    qualification_img = json.get("qualificationImg"),
                    institute_id = json.get("instituteId")
                )
                db.session.add(new_qualification)
                db.session.commit()
                return {"message": "New qualification added."}
            except ValueError as e:
                return {"error": [str(e)]}

class Qualification(Resource):
    def get(self, id):
        qualification = QualificationModel.query.filter(QualificationModel.id == id).first()
        if qualification:
            return qualification.to_dict(), 201
        else:
            return {"error": f"Qualification {id} not found."}, 404
        
    def patch(self, id):
        data = request.get_json()

        qualification = QualificationModel.query.filter(QualificationModel.id == id).first()
        if qualification:
            try:
                for attr in data:
                    setattr(qualification, attr, data[attr])
                db.session.add(qualification)
                db.session.commit()
                return {"message": f"Qualification {id} edited."}
            except ValueError as e:
                return {"error": [str(e)]}
        else:
            return {"error": f"Qualification {id} not found."}, 404
    
    def delete(self, id):
        qualification = QualificationModel.query.filter(QualificationModel.id == id).first()
        if qualification:
            db.session.delete(qualification)
            db.session.commit()
            return {"message": f"Qualification {id} deleted"}, 201
        else:
            return {"error": f"Could not find qualification {id}"}, 404