from flask import session, make_response, request
from flask_restful import Resource

from config import db

import os 

from models.user import UserModel

class Logout(Resource):
    def delete(self):
        print(f"Session before logout: {session}")

        user_id = session.get("user_id")

        if user_id:
            session.pop("user_id")
            print("User logged out successfully")
            return {}, 204 
        print("Unauthorised logout attempt")
        return{"message": "Unauthorized"}, 401