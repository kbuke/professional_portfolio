from flask import session, make_response, request
from flask_restful import Resource
from config import db

from models.SocialMedia import SocialMediaModel

class SocialMediaLists(Resource):
    def get(self):
        media = [socials.to_dict() for socials in SocialMediaModel.query.all()]
        return media
    
    def post(self):
        json = request.get_json()

        if json:
            try:
                new_socials = SocialMediaModel(
                    name = json.get("socialName"),
                    link = json.get("socialLink")
                )
                db.session.add(new_socials)
                db.session.commit()
                return {"message": "New socials added."}
            except ValueError as e:
                return {"error": [str(e)]}

class SocialMedia(Resource):
    def get(self, id):
        media = SocialMediaModel.query.filter(SocialMediaModel.id == id).first()
        if media:
            return media.to_dict(), 201
        else:
            return {"error": f"Social Media {id} not found"}, 404
    
    def patch(self, id):
        data = request.get_json()

        media = SocialMediaModel.query.filter(SocialMediaModel.id == id).first()
        if media:
            try:
                for attr in data:
                    setattr(media, attr, data[attr])
                db.session.add(media)
                db.session.commit()
                return {"message": f"Media {id} updated"}, 201
            except ValueError as e:
                return {"error": [str(e)]}

    def delete(self, id):
        media = SocialMediaModel.query.filter(SocialMediaModel.id == id).first()
        if media:
            db.session.delete(media)
            db.session.commit()
            return {"message": f"Media {id} deleted"}, 201
        else:
            return {"error": f"No media {id} found"}, 404