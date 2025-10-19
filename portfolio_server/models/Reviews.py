from config import db 
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

from models.Institutes import InstituteModel

class ReviewModel(db.Model, SerializerMixin):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    image = db.Column(db.String, nullable = True)
    rating = db.Column(db.Integer, nullable = False)
    review = db.Column(db.String, nullable = False)
    position = db.Column(db.String, nullable = False)
    place_of_relation = db.Column(db.String, nullable = False)

    @validates("rating")
    def validate_rating(self, key, value):
        # 1 - check value is an integer
        if not isinstance(value, int):
            try:
                value = int(value)
            except ValueError:
                raise ValueError("Rating must be an integer.")
    
        if value <= 0 or value > 5:
            raise ValueError("Value must be between 1 and 5")
        
        return value
        
    @validates("place_of_relation")
    def validate_company(self, key, value):
        check_institute = InstituteModel.query.filter(InstituteModel.institute_name == value).first()
        if not check_institute:
            raise ValueError("Institute does not exist.")
        return value

    @validates("image")
    def validate_img(self, key, value):
        # 1 - Check if value has any input, if not give default value
        if value is None or value == "":
            value = "https://static.vecteezy.com/system/resources/previews/046/010/545/non_2x/user-icon-simple-design-free-vector.jpg"
        
        return value