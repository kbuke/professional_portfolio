from config import db 

from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

from models.Projects import ProjectModel

class ProjectParagraphModel(db.Model, SerializerMixin):
    __tablename__ = "project_paragraphs"

    id = db.Column(db.Integer, primary_key = True)
    paragraph = db.Column(db.String)
    paragraph_img_1 = db.Column(db.String)
    paragraph_img_2 = db.Column(db.String)

    # RELATIONS
    project_id = db.Column(db.ForeignKey("projects.id"))
    project = db.relationship("ProjectModel", back_populates = "paragraphs")

    # SERIALIZATION
    # serialize project info
    def serialize_project(*attributes):
        return tuple(f"-project.{attr}" for attr in attributes)

    serialize_rules = (
        *serialize_project(
            "paragraphs", "institute_id", "project_start_date",
            "project_img", "project_intro", "points", "project_end_date", "project_video"
        ),

        "-project.institute",
    )

    # VALIDATION
    @validates("paragraph")
    def validate_paragraph(self, key, value):
        if value is None or value == "":
            raise ValueError("Please enter a paragraph of text.")
        return value 
    
    @validates("project_id")
    def validate_project(self, key, value):
        if isinstance(value, str):
            value = int(value)
        
        if not isinstance(value, int):
            raise ValueError("Please enter an integer for the project_id")
        
        if isinstance(value, int):
            project = ProjectModel.query.filter(ProjectModel.id == value).first()
            if not project:
                raise ValueError(f"Project {value} is not registered on this app.")

        return value 