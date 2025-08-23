from flask_restful import Resource
from flask import session
from models.user import UserModel

class CheckSession(Resource):
    def get(self):
        print(f"Session during CheckSession: {session}")
        user_id = session.get("user_id")
        if user_id:
            user = UserModel.query.filter(UserModel.id==user_id).first()
            if user:
                return user.to_dict(), 200
        return {"message": "Unauthorised user"}, 401