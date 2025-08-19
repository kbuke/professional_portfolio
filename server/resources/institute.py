from config import db 
from datetime import datetime

from models.institute import InstituteModel

from flask_restful import Resource
from flask import session, request

class InstituteList(Resource):
    def get(self):
        institutes = [institute.to_dict()for institute in InstituteModel.query.all()]
        return institutes, 200
    
    def post(self):
        json = request.get_json()
        
        chosen_start_date = json.get("start_date")
        chosen_end_date = json.get("end_date")

        if isinstance(chosen_start_date, str):
            chosen_start_date = datetime.strptime(chosen_start_date, "%Y-%m-%d").date()
        
        if isinstance(chosen_end_date, str):
            chosen_end_date = datetime.strptime(chosen_end_date, "%Y-%m-%d").date()
        elif chosen_end_date is None:
            chosen_end_date = None

        try:
            new_institute = InstituteModel(
                name=json.get("name"),
                img=json.get("img"),
                position=json.get("position"),
                location=json.get("location"),
                start_date=chosen_start_date,
                end_date=chosen_end_date,
                user_id=json.get("user_id")
            )
            db.session.add(new_institute)
            db.session.commit()
            return new_institute.to_dict(), 201 
        except ValueError as e:
            return{
                "message": [str(e)]
            }, 400