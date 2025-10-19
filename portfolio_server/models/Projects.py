from config import db 
from sqlalchemy import event
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from datetime import date, datetime

from models.Institutes import InstituteModel

class ProjectModel(db.Model, SerializerMixin):
    __tablename__ = "projects"

    id = db.Column(db.Integer, primary_key = True)
    project_name = db.Column(db.String)
    project_img = db.Column(db.String)
    project_video = db.Column(db.String)
    project_start_date = db.Column(db.Date)
    project_end_date = db.Column(db.Date, nullable = True)
    project_intro = db.Column(db.String, nullable = False)
    website_url = db.Column(db.String, nullable = True)
    github_url = db.Column(db.String, nullable = True)

    # RELATIONS
    # relationship with institute
    institute_id = db.Column(db.ForeignKey("institutes.id"))
    institute = db.relationship("InstituteModel", back_populates = "projects")

    # relationship with points
    points = db.relationship("ProjectPointModel", back_populates = "project", passive_deletes=True) #passive_deletes will ensure the point is deleted even though project_id is None which breaks validation logic

    # relationship with paragraphs
    paragraphs = db.relationship("ProjectParagraphModel", back_populates = "project", cascade = "all, delete-orphan")

    # relationship with tech backend
    backend = db.relationship("TechnologyModel", back_populates = "project_back_end", secondary = "backend_tech")

    # relationship with tech frontend
    frontend = db.relationship("TechnologyModel", back_populates = "project_front_end", secondary = "front_end_tech")

    # relationship with apis
    apis = db.relationship("ApiModel", back_populates = "projects", secondary = "api_projects")

    # relationship with cloud engineering
    cloud = db.relationship("TechnologyModel", back_populates = "project_cloud", secondary = "cloud_projects")

    # SERIALIZATION
    # institutes
    def serialize_institutes(*attributes):
        return tuple(f"-institute.{attr}" for attr in attributes)

    serialize_rules = (
        *serialize_institutes("projects", "institute_city", "institute_country", "institute_intro"),

        "-points.project",

        "-paragraphs.project",

        "-technologies.projects",

        "-project_technologies.project",
        "-project_technologies.technology",

        "-backend.project_back_end",

        "-frontend.project_front_end",

        "-apis.projects",
    )

    # VALIDATIONS
    # validate institute_id
    @validates("institute_id")
    def validate_institute(self, key, value):
        try:
            int(value)
        except ValueError as e:
            raise ValueError("id must be an integer")
        return value

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

        institute_id = self.institute_id

        institute = InstituteModel.query.filter(InstituteModel.id == institute_id).first()

        institute_start_date = institute.institute_start_date
        institute_end_date = institute.institute_end_date

        # Ensure project dates are in-line with institute dates.
        if project_start_date and project_end_date and project_end_date < project_start_date:
            raise ValueError("You must have started the project before finising it.") #

        if project_start_date < institute_start_date:
            raise ValueError("You must have started the project after you started at the institute") #
        
        if institute_end_date and institute_end_date < project_start_date:
            raise ValueError("You must have started the project before finishing at the institute.") #
        
        if institute_end_date and project_end_date and institute_end_date < project_end_date:
            raise ValueError("You must have finished the project before (or when) finishing the institution") #
        
        return value
    
    # TABLE ARGUMENTS
    __table_args__ = (
        db.UniqueConstraint("project_name", name="unique_project_name"),
    )