from config import db 

from models.email import EmailModel

from flask_restful import Resource
from flask import session, request, make_response

from email.message import EmailMessage

import os

import smtplib

from dotenv import load_dotenv

class EmailList(Resource):
    def get(self):
        email = [emails.to_dict() for emails in EmailModel.query.all()]
        return email, 200

    def post(self):

        load_dotenv()
        recipient = os.getenv("EMAIL")
        password = os.getenv("PASSWORD")

        json=request.get_json()
        
        try:
            new_email = EmailModel(
                subject=json.get("subject"),
                sender=json.get("sender"),
                message=json.get("message"),
                name=json.get("name")
            )
            db.session.add(new_email)
            db.session.commit()

            msg = EmailMessage()
            msg["Subject"] = new_email.subject
            msg["From"] = new_email.sender
            msg["To"] = recipient

            msg.set_content(
                f"Name: {new_email.name}\n"
                f"Email: {new_email.sender}\n"
                f"Message: {new_email.message}"
            )

            # send via SMTP
            with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
                smtp.login(recipient, password)
                smtp.send_message(msg)
            return {"message": "Email sent and saved"}, 201

        except Exception as e:
            db.session.rollback()
            return{"message": [str(e)]}, 500
    
class Email(Resource):
    def delete(self, id):
        email = EmailModel.query.filter(EmailModel.id==id).first()
        if email:
            db.session.delete(email)
            db.session.commit()
            return{"message": "Email deleted"}, 201 
        return{"message": "Email not found"}, 404


