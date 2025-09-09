from models.User import UserModel

from flask import make_response, session, request
from flask_restful import Resource

from config import db

class UserList(Resource):
    def get(self):
        users = [user.to_dict() for user in UserModel.query.all()]
        return users
    
    def post(self):
        json = request.get_json()

        if json:
            try:
                new_user = UserModel(
                    first_name = json.get("firstName"),
                    last_name = json.get("lastName"),
                    user_intro = json.get("userIntro"),
                    user_img = json.get("userImg"),
                    user_cv = json.get("cv"),
                    email = json.get("email")
                )
                new_user.password_hash = json.get("newPassword")
                db.session.add(new_user)
                db.session.commit()
                return {"message": "New user registered"}, 201
            except ValueError as e:
                return {"error": [str(e)]}, 400

class User(Resource):
    def get(self, id):
        user = UserModel.query.filter(UserModel.id == id).first()
        if user:
            return user.to_dict(), 201
        else:
            return {"error": f"User {id} not registered"}, 404
    
    def patch(self, id):
        data = request.get_json()

        user = UserModel.query.filter(UserModel.id == id).first()
        if user:
            try:
                for attr in data:
                    setattr(user, attr, data[attr])
                db.session.add(user)
                db.session.commit()
                return {"messae": f"Successfully updated user {id}"}
            except ValueError as e:
                return {"error": [str(e)]}
        else:
            return {"error": f"User {id} not found"}, 404
    
    def delete(self, id):
        user = UserModel.query.filter(UserModel.id == id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            return {"message": f"User {id} deleted."}, 201
        else:
            return {"error": f"User {id} not found"}
