from config import db 
from sqlalchemy import event
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from datetime import date, datetime

class ProjectModel(db.Model, SerializerMixin):
    __tablename__ = "projects"

    id = db.Column(db.Integer, primary_key = True)
    project_name = db.Column(db.String)
    project_img = db.Column(db.String)
    project_video = db.Column(db.String)
    project_start_date = db.Column(db.Date)
    project_end_date = db.Column(db.Date, nullable = True)
    project_intro = db.Column(db.String, nullable = False)

    # VALIDATIONS
    # validate if there is a project image or a project video
    @validates("project_img", "project_video")
    def validate_project_media(self, key, value):
        project_img = value if key == "project_img" else self.project_img
        project_video = value if key == "project_video" else self.project_video

        # ensure that if there is no image there must be a video 
        # and if there is no image there must be a video
        if not project_img and not project_video:
            raise ValueError("You must upload either a image or video for the project")
        return value
        
    # validate the projects start and end dates.
    @validates("project_start_date", "project_end_date")
    def validate_project_dates(self, key, value):
        if value is None:
            if key == "project_start_date":
                raise ValueError("Must incluse start date")
            else:
                return None
            
        if isinstance(value, str):
            try:
                value = datetime.strptime(value, "%Y-%m-%d").date()
            except ValueError:
                raise ValueError("Must enter a valid date.")
        
        elif not isinstance(value, date):
            raise ValueError("Must enter a valid date.")
        
        project_start_date = value if key == "project_start_date" else self.project_start_date
        project_end_date = value if key == "project_end_date" else self.project_end_date

        if project_start_date and project_end_date and project_end_date < project_start_date:
            raise ValueError("The project must have ended after the start date.")
        
        return value
    
    # TABLE ARGUMENTS
    __table_args__ = (
        db.UniqueConstraint("project_name", name="unique_project_name"),
    )