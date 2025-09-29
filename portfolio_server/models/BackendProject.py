from config import db 
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

from models.Projects import ProjectModel
from models.Technology import TechnologyModel

class BackEndTechModels(db.Model, SerializerMixin):
    __tablename__ = "backend_tech"

    id = db.Column(db.Integer, primary_key = True)
    tech_id = db.Column(db.ForeignKey("technologies.id"))
    project_id = db.Column(db.ForeignKey("projects.id"))

    @validates("tech_id", "project_id")
    def validate_relation(self, key, value):
        if value is None:
            raise ValueError(f"{key} cannot be null")
    
        if not isinstance(value, int):
            try:
                value = int(value)
            except ValueError:
                raise ValueError("Please enter an integer")
    
        project_id = value if key == "project_id" else self.project_id
        tech_id = value if key == "tech_id" else self.tech_id

        if project_id is not None:
            existing_project = ProjectModel.query.get(project_id)
            if not existing_project:
                raise ValueError(f"Project {project_id} not registered on this app.")
    
        if tech_id is not None:
            existing_tech = TechnologyModel.query.get(tech_id)
            if not existing_tech:
                raise ValueError(f"Tech {tech_id} not registered on this app.")
    
        if project_id is not None and tech_id is not None:
            existing_relation = BackEndTechModels.query.filter_by(
                tech_id=tech_id,
                project_id=project_id
            ).first()
            if existing_relation and existing_relation.id != self.id:
                raise ValueError(f"Project {project_id} and Tech {tech_id} already have a defined relationship.")
    
        return value


