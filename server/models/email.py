from config import db 
from sqlalchemy_serializer import SerializerMixin

class EmailModel(db.Model, SerializerMixin):
    __tablename__ = "emails"

    id=db.Column(db.Integer, primary_key=True)
    subject=db.Column(db.String, nullable=False)
    sender=db.Column(db.String, nullable=False)
    message=db.Column(db.String, nullable=False)
    name=db.Column(db.String, nullable=False)

