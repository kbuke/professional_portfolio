from config import db 
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

class TechnologyModel(db.Model, SerializerMixin):
    __tablename__ = "technologies"

    id = db.Column(db.Integer, primary_key = True)
    tech_name = db.Column(db.String)
    tech_img = db.Column(db.String)

    # RELATIONS

    # SERIALIZATION

    # VALIDATIONS
    @validates("tech_name")
    def validate_tech(self, key, value):
        if value is None or "":
            raise ValueError("Please enter a valid name.")
        
        if not isinstance(value, str):
            raise ValueError("Value must be a string")
        
        if isinstance(value, str):
            existing = TechnologyModel.query.filter(TechnologyModel.tech_name == value).first()
            if existing and value.id != existing.id:
                raise ValueError(f"{value} is already regustered on this app.")
        
        return value