from config import db 
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

class SocialMediaModel(db.Model, SerializerMixin):
    __tablename__ = "social_media"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    link = db.Column(db.String)

    @validates("name")
    def validate_media(self, key, value):
        if not isinstance(value, str) or value is None or value == "":
            raise ValueError("Please enter a valid title")
        
        if isinstance(value, str):
            existing = SocialMediaModel.query.filter(SocialMediaModel.name == value).first()
            if existing and existing.id != self.id:
                raise ValueError(f"{value} is already registered on here.")
        
        return value
    
    @validates("link")
    def validate_link(self, key, value):
        if not isinstance(value, str) or value is None or value == "":
            raise ValueError("Please enter a valid link")
        
        if isinstance(value, str):
            existing = SocialMediaModel.query.filter(SocialMediaModel.link == value).first()
            if existing and existing.id != self.id:
                raise ValueError(f"{value} is already registered on here.")
            
        return value