from config import db 
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

class BackEndTechModels(db.Model, SerializerMixin):
    __tablename__ = "backend_tech"

    id = db.Column(db.Integer, primary_key = True)
    tech_id = db.Column(db.ForeignKey("technologies.id"))
    project_id = db.Column(db.ForeignKey("projects.id"))