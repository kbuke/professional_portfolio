from config import db 

from models.user import UserModel

from flask_restful import Resource
from flask import session, request, make_response

class UserList(Resource):
    def get(self):
        users = [user.to_dict() for user in UserModel.query.all()]
        return users, 200 
    

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
    
    def patch(self, id):
        data = request.get_json()
        user = UserModel.query.filter(UserModel.id==id).first()
        if user:
            try:
                for attr in data:
                    setattr(user, attr, data[attr])
                db.session.add(user)
                db.session.commit()
                return make_response(user.to_dict(), 202)
            except ValueError as e:
                return{
                    "message": [str(e)]
                }, 400
        return{
            "message": "User not found"
        }, 404