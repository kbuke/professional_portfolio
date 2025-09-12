from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from config import db

class FrontEndProjectModel(db.Model, SerializerMixin):
    __tablename__ = "front_end_tech"

    id = db.Column(db.Integer, primary_key = True)

    project_id = db.Column(db.ForeignKey("projects.id"))
    tech_id = db.Column(db.ForeignKey("technologies.id"))