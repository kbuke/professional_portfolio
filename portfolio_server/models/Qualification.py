from config import db 
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

from models.Institutes import InstituteModel

class QualificationModel(db.Model, SerializerMixin):
    __tablename__ = "qualifications"

    id = db.Column(db.Integer, primary_key = True)
    qualification = db.Column(db.String, nullable = False)
    qualification_img = db.Column(db.String, nullable = False)

    # RELATIONS
    institute_id = db.Column(db.ForeignKey("institutes.id"))
    institute = db.relationship("InstituteModel", back_populates = "qualifications")

    # SERIALIZE RULES
    serialize_rules = (
        "-institute.qualifications",
        "-institute.projects",
    )

    # VALIDATION
    # validate qualification value
    @validates("qualification")
    def validate_qualification(self, key, value):
        if not isinstance(value, str):
            raise ValueError("Qualification must be a string")
        
        if value is None or value == "":
            raise ValueError("Please enter a valid string.")
        
        if isinstance(value, str):
            existing = QualificationModel.query.filter(QualificationModel.qualification == value).first()
            if existing and existing.id != self.id:
                raise ValueError(f"{value} is an already reguistered qualification.")
        
        return value
    
    # validate the institutes
    @validates("institute_id")
    def validate_institute(self, key, value):
        if value is None:
            raise ValueError("Please enter a institute.")
        
        if not isinstance(value, int):
            try:
                value = int(value)
            except ValueError:
                raise ValueError("Value must be an integer.")
        
        if isinstance(value, int):
            existing_institute = InstituteModel.query.filter(InstituteModel.id == value).first()
            if existing_institute is None:
                raise ValueError(f"There is no institute with id: {value}")
        
        return value

