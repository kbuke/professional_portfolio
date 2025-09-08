from models.Institutes import InstituteModel
from config import db 

from flask import make_response, session, request
from flask_restful import Resource

class InstituteList(Resource):
    def get(self):
        institutes = [institute.to_dict() for institute in InstituteModel.query.all()]
        return institutes
    
    def post(self):
        json = request.get_json()

        if json:
            try:
                new_institute = InstituteModel(
                    institute_name = json.get("instituteName"),
                    institute_img = json.get("instituteImg"),
                    institute_start_date = json.get("instituteStartDate"),
                    institute_end_date = json.get("instituteEndDate"),
                    institute_city = json.get("instituteCity"),
                    institute_country = json.get("instituteCountry"),
                    institute_intro = json.get("instituteIntro")
                )
                db.session.add(new_institute)
                db.session.commit()
                return {"message": "New Institute created."}, 201
            except ValueError as e:
                return {"error": [str(e)]}