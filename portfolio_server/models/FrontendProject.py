from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from config import db

from models.Projects import ProjectModel
from models.Technology import TechnologyModel

class FrontEndProjectModel(db.Model, SerializerMixin):
    __tablename__ = "front_end_tech"

    id = db.Column(db.Integer, primary_key = True)

    project_id = db.Column(db.ForeignKey("projects.id"))
    tech_id = db.Column(db.ForeignKey("technologies.id"))

    @validates("tech_id", "project_id")
    def validate_relations(self, key, value):
        if not isinstance(value, int):
            try:
                value = int(value)
            except ValueError:
                return {"error": "Please enter a valid integer."}
        
        if isinstance(value, int):
            project_id = value if key == "project_id" else self.project_id
            tech_id = value if key == "tech_id" else self.tech_id

            if project_id is not None:
                existing_project = ProjectModel.query.filter(ProjectModel.id == project_id).first()
                if not existing_project:
                    raise ValueError(f"Project: {project_id} is not registered on this app")
            
            if tech_id is not None:
                existing_tech = TechnologyModel.query.filter(TechnologyModel.id == tech_id).first()
                if not existing_tech:
                    raise ValueError(f"Tech {tech_id} is not registered on this app.")
            
            if project_id is not None and tech_id is not None:
                existing_relation = FrontEndProjectModel.query.filter_by(
                    project_id = project_id,
                    tech_id = tech_id
                ).first()
                if existing_relation and existing_relation.id != self.id:
                    raise ValueError(f"Project: {project_id} and Tech: {tech_id} already have a front-end relation.")
        
        return value

