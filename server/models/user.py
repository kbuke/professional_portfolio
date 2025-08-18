from sqlalchemy_serializer import SerializerMixin
from config import db 

class UserModel(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    picture = db.Column(db.String, nullable=False, unique=True)
    intro = db.Column(db.String, nullable=False)
    cv = db.Column(db.String, nullable=False)

    institutes = db.relationship("InstituteModel", back_populates="user", lazy="dynamic")

    serialize_rules = (
        "-institutes.user",
    )