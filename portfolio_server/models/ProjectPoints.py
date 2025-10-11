from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

from models.Projects import ProjectModel

class ProjectPointModel(db.Model, SerializerMixin):
    __tablename__ = "project_points"

    id = db.Column(db.Integer, primary_key = True)
    project_point = db.Column(db.String, nullable = False)

    # RELATIONS
    project_id = db.Column(db.ForeignKey("projects.id", ondelete="CASCADE"))
    project = db.relationship("ProjectModel", back_populates = "points")

    # SERIALIZATION
    # serialize project info
    def serialize_project(*attributes):
        return tuple(f"-project.{attr}" for attr in attributes)
    
    serialize_rules = (
        *serialize_project(
            "project_intro", "project_img", "project_video", 
            "project_end_date", "institute", "project_start_date", 
            "points", "institute_id"
        ),
    )

    # VALIDATIONS
    @validates("project_point")
    def validate_point(self, key, value):
        if value is None or value == "":
            raise ValueError("Must enter a point.")
        return value
    
    @validates("project_id")
    def validate_project(self, key, value):
        if isinstance(value, str):
            try:
                value = int(value)
            except ValueError:
                raise ValueError("Please enter a integer")
            
        if not isinstance(value, int):
            raise ValueError("Please enter a valid id number")
        
        if isinstance(value, int):
            project = ProjectModel.query.filter(ProjectModel.id == value).first()
            if project is None:
                raise ValueError(f"Project id {value} is not registered.")
            
        
        return value