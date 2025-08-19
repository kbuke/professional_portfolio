from sqlalchemy_serializer import SerializerMixin
from config import db 
from sqlalchemy.orm import validates
from datetime import date

class QualificationModel(db.Model, SerializerMixin):
    __tablename__ = "qualifications"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False, unique=True)
    img_1 = db.Column(db.String, nullable=False, unique=True)
    img_2 = db.Column(db.String, nullable=True, unique=True)
    date = db.Column(db.Date, nullable=False, unique=True)

    # set up relations
        # one-to-many with institutes
    institute_id = db.Column(db.ForeignKey("institutes.id"))
    institutes = db.relationship("InstituteModel", back_populates="qualifications")
    
    # set up validations
    
    # serialize rules
    serialize_rules=(
        "-institutes.qualifications",
    )