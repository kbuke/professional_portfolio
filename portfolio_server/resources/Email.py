from flask import session, make_response, request
from flask_restful import Resource
from config import db
from models.Emails import EmailModel
from models.User import UserModel
from email.message import EmailMessage
import smtplib
from dotenv import load_dotenv
import os

load_dotenv()
password = os.getenv("GMAIL_PASSWORD")

class EmailList(Resource):
    def post(self):
        json = request.get_json()
        
        recipient = UserModel.query.get(1)
        if not recipient:
            return {"error": "Recipient not found"}, 404
        
        recipient_email = recipient.email

        try:
            new_email = EmailModel(
                email_subject = json.get("emailSubject"),
                email_message = json.get("emailMessage"),
                sender_email = json.get("senderEmail"),
                recipient_email = recipient_email
            )
            db.session.add(new_email)
            db.session.commit()

            # Build the email message
            msg = EmailMessage()
            msg["Subject"] = new_email.email_subject
            msg["From"] = f"My App Contact Form <{recipient_email}>"
            # new_email.sender_email
            msg["To"] = new_email.recipient_email
            msg["Reply-To"] = new_email.sender_email
            msg.set_content(
                f"Message from: {new_email.sender_email}\n\n{new_email.email_message}"
            )

            # Send it using Gmail SMTP
            with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
                smtp.login(recipient_email, password)
                smtp.send_message(msg)
            
            return {"message": "Email sent successfully"}, 201
                
        except ValueError as e:
            return {"error": str(e)}, 400
        except Exception as e:
            return {"error": f"Failed to send email: {str(e)}"}, 500
