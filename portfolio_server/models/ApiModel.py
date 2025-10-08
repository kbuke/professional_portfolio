from config import db 
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

class ApiModel(db.Model, SerializerMixin):
    __tablename__ = "APIs"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False, unique = True)
    img = db.Column(db.String, nullable = False)

    # VALIDATES
    @validates("name")
    def validate_name(self, key, value):
        # 1 - check value is a string
        if not isinstance(value, str):
            try:
                value = str(value)
            except ValueError as e:
                return {"error": [str(e)]}
        
        # 2 - check that the value does not already exist
        existing_api = ApiModel.query.filter(ApiModel.name == value).first()
        if existing_api and self.id != existing_api.id:
            return(f"{value} is already a registered api")
        
        return value