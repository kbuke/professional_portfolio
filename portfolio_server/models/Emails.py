from sqlalchemy_serializer import SerializerMixin
from config import db 
from sqlalchemy.orm import validates
import re

class EmailModel(db.Model, SerializerMixin):
    __tablename__ = "emails"

    id = db.Column(db.Integer, primary_key = True)
    email_subject = db.Column(db.String, nullable = False)
    email_message = db.Column(db.String, nullable = False)
    sender_email = db.Column(db.String, nullable = False)
    recipient_email = db.Column(db.String, nullable = False)

    # VALIDATIONS
    @validates("email_subject")
    def validate_subject(self, key, value):
        if not isinstance(value, str):
            raise ValueError("Subject must be a string")
        
        if not value.strip():
            raise ValueError("There must be a subject to the email.")
        
        return value

    # Validate senders email address
    @validates("sender_email")
    def validate_email(self, key, value):
        email_regex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"

        if not isinstance(value, str):
            raise ValueError("Email address must be a string.")
        
        if not re.match(email_regex, value):
            raise ValueError(f"{value} is not a valid email address")

        return value
        


        
