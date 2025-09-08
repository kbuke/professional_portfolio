from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from config import db 
from datetime import date, datetime

class InstituteModel(db.Model, SerializerMixin):
    __tablename__ = "institutes"

    id = db.Column(db.Integer, primary_key=True)
    institute_name = db.Column(db.String)
    institute_img = db.Column(db.String)
    institute_start_date = db.Column(db.Date)
    institute_end_date = db.Column(db.Date, nullable = True)
    institute_city = db.Column(db.String)
    institute_country = db.Column(db.String)
    institute_intro = db.Column(db.String)

    # RELATIONS
    # Set up relation with projects

    # VALIDATIONS
    # date validations
    @validates("institute_start_date", "institute_end_date")
    def validate_institute_dates(self, key, value):
        if value is None:
            if key == "institute_start_date":
                raise ValueError("The institute must have a start date.")
            else:
                return None
        
        if isinstance(value, str):
            try:
                value = datetime.strptime(value, "%Y-%m-%d").date()
            except ValueError:
                raise ValueError("Must enter a valid date.")
        
        elif not isinstance(value, date):
            raise ValueError("Must enter a valid date")
        
        institute_start_date = value if key == "institute_start_date" else self.institute_start_date
        institute_end_date = value if key == "institute_end_date" else self.institute_end_date

        if institute_end_date and institute_start_date and institute_end_date < institute_start_date:
            raise ValueError("You must have ended the institute, after you started.")
        
        return value
