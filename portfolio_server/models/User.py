from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.exc import IntegrityError
from config import db, bcrypt

class UserModel(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    user_intro = db.Column(db.String)
    user_img = db.Column(db.String)
    user_cv = db.Column(db.String)
    email = db.Column(db.String)
    _password_hash = db.Column(db.String, nullable = False)

    @hybrid_property
    def password_hash(self):
        raise AttributeError("password: write-only attribute")
    
    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)

    
    @validates("email")  # could be any field, or just do in POST
    def check_single_user(self, key, value):
        check_user = UserModel.query.first()
        if check_user and check_user.id != self.id:
            raise ValueError("There can only be one registered user in the app.")
        return value


    
