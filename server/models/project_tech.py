from config import db 
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

class ProjectTechModel(db.Model, SerializerMixin):
    __tablename__ = "project_tech"

    id = db.Column(db.Integer, primary_key=True)

    # set up relations
    project_id = db.Column(db.Integer, db.ForeignKey("projects.id"))
    tech_id = db.Column(db.Integer, db.ForeignKey("tech.id"))