from config import db 
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

class TechnologyModel(db.Model, SerializerMixin):
    __tablename__ = "technologies"

    id = db.Column(db.Integer, primary_key = True)
    tech_name = db.Column(db.String)
    tech_img = db.Column(db.String)

    # RELATIONS
    # relation with bacendTech
    project_back_end = db.relationship("ProjectModel", back_populates = "backend", secondary = "backend_tech")

    # relation with frontendTech
    project_front_end = db.relationship("ProjectModel", back_populates = "frontend", secondary = "front_end_tech")

    # SERIALIZATION
    serialize_rules = (
        "-project_front_end.frontend",
        "--project_front_end.backend",

        "-project_back_end.backend",
        "--project_back_end.frontend",
    )

    # VALIDATIONS
    @validates("tech_name")
    def validate_tech(self, key, value):
        if value is None or "":
            raise ValueError("Please enter a valid name.")
        
        if not isinstance(value, str):
            raise ValueError("Value must be a string")
        
        if isinstance(value, str):
            existing = TechnologyModel.query.filter(TechnologyModel.tech_name == value).first()
            if existing and self.id != existing.id:
                raise ValueError(f"{value} is already regustered on this app.")
        
        return value