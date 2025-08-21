from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from config import db

from datetime import date

class InstituteModel(db.Model, SerializerMixin):
    __tablename__ = "institutes"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    img = db.Column(db.String, nullable=False, unique=True)
    position = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=True) # a null value implies I am still in attendance/employed

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), unique=False, nullable=False)
    user = db.relationship("UserModel", back_populates="institutes")

    projects = db.relationship("ProjectModel", back_populates="institute", lazy="dynamic")
    qualifications = db.relationship("QualificationModel", back_populates="institutes", lazy=True)

    @validates("end_date")
    def validate_end_date(self, key, end_date):
        if end_date is None:
            return None 
        if self.start_date and end_date <= self.start_date:
            raise ValueError("End date must be after start date.")
        return end_date
    
    serialize_rules = (
        "-user.institutes",
        "-institutes.user",

        "-projects.institute",
        "-projects.points",
        "-projects.tech",
        "-projects.paragraphs",

        "-qualifications.institutes",

        "-user",
    )