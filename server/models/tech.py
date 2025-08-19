from config import db 
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

class TechModel(db.Model, SerializerMixin):
    __tablename__ = "tech"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    img = db.Column(db.String, nullable=False)

    # set up relations
    projects = db.relationship("ProjectModel", back_populates="tech", secondary="project_tech")