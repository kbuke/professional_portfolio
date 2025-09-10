from flask import make_response, session, request
from flask_restful import Resource
from config import db 
from models.User import UserModel

class CheckSession(Resource):
    def get(self):
        user_id = session.get("user_id")
        if user_id:
            user = UserModel.query.filter(UserModel.id == user_id).first()
            if user:
                return user.to_dict(), 200
        return {"error": "Unauthorized user"}, 401