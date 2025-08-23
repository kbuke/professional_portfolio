from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt
from sqlalchemy.ext.hybrid import hybrid_property

class UserModel(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    picture = db.Column(db.String, nullable=False, unique=True)
    intro = db.Column(db.String, nullable=False)
    cv = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False, server_default="default_value")
    email=db.Column(db.String, nullable=False, server_default="default_value")

    institutes = db.relationship("InstituteModel", back_populates="user", lazy="dynamic")

    # set up hashing password
    @hybrid_property
    def password_hash(self):
        raise AttributeError("password: write-only attribute")
    
    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)

    serialize_rules = (
        "-institutes.user",
    )