from config import db 

from models.user import UserModel

from flask_restful import Resource
from flask import session, request, make_response

class UserList(Resource):
    def get(self):
        users = [user.to_dict() for user in UserModel.query.all()]
        return users, 200 
    
    def post(self):
        json = request.get_json()
        try:
            new_user = UserModel(
                name = json.get("name"),
                picture = json.get("picture"),
                intro = json.get("intro"),
                cv = json.get("cv")
            )
            db.session.add(new_user)
            db.session.commit()
            return new_user.to_dict(), 201 
        except ValueError as e:
            return{
                "error": [str(e)]
            }, 400

class User(Resource):
    def get(self, id):
        user = UserModel.query.filter(UserModel.id==id).first()
        if user:
            return make_response(user.to_dict(), 201)
        else:
            return {
                "message": "User not found"
            }, 404
    
    def delete(self, id):
        user = UserModel.query.filter(UserModel.id==id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            return{
                "message": "User deleted."
            }, 200
        return{
            "error": "User not found"
        }, 404