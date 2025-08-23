from flask import session, make_response, request
from flask_restful import Resource

from config import db

import os 

from models.user import UserModel

class Login(Resource):
    def post(self):
        json = request.get_json()

        sign_in_email = json.get("email").strip()
        sign_in_password = json.get("password")

        if not sign_in_email or not sign_in_password:
            return{
                "message": "Please enter an email and a password"
            }, 400 
        
        user = UserModel.query.filter(UserModel.email==sign_in_email).first()

        if user and user.authenticate(sign_in_password):
            session["user_id"] = user.id
            print(f"Session set: {session}")
            return user.to_dict(), 200 
        return {"error": "Invalid email or password"}
