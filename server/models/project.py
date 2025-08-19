from sqlalchemy_serializer import SerializerMixin
from config import db 
from datetime import date
from sqlalchemy.orm import validates

class ProjectModel(db.Model, SerializerMixin):
    __tablename__ = "projects"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    title_img = db.Column(db.String)
    title_video = db.Column(db.String)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)

    institute_id = db.Column(db.Integer, db.ForeignKey("institutes.id"))
    institute = db.relationship("InstituteModel", back_populates="projects")

    paragraphs = db.relationship("ParagraphModel", back_populates="projects", lazy="dynamic")
    points = db.relationship("PointModel", back_populates="projects", lazy="dynamic")

    @validates("end_date")
    def validate_end_date(self, key, end_date):
        if end_date is None:
            return None 
        if self.start_date and end_date <= self.start_date:
            raise ValueError("End date must come after the start date")
        return end_date
    
    serialize_rules = (
        "-institute.projects",
        "-paragraphs.projects",
        "-points.projects",
        "-paragraphs.institute",
        "-projects.pragraphs",
        "-projects.institute",
    )