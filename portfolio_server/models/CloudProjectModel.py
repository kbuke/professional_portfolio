from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

from models.Projects import ProjectModel
from models.Technology import TechnologyModel

class CloudProjectModel(db.Model, SerializerMixin):
    __tablename__ = "cloud_projects"

    id = db.Column(db.Integer, primary_key = True)
    project_id = db.Column(db.ForeignKey("projects.id"))
    tech_id = db.Column(db.ForeignKey("technologies.id"))

    @validates("project_id", "tech_id")
    def validate_relations(self, key, value):
        if not isinstance(value, int):
            try:
                value = int(value)
            except ValueError:
                return {"error": "Please enter a valid integer"}
        
        if isinstance(value, int):
            project_id = value if key == "project_id" else self.project_id
            tech_id = value if key == "tech_id" else self.tech_id

            if project_id is not None:
                exitsiting_project = ProjectModel.query.filter(ProjectModel.id == project_id).first()
                if not exitsiting_project:
                    raise ValueError(f"Project id {project_id} is not registered.")
            
            if tech_id is not None:
                existing_tech = TechnologyModel.query.filter(TechnologyModel.id == tech_id).first()
                if not existing_tech:
                    raise ValueError(f"Tech id {tech_id} is not registered on the app")
            
            if project_id is not None and tech_id is not None:
                existing_relation = CloudProjectModel.query.filter_by(
                    project_id = project_id,
                    tech_id = tech_id
                ).first()
                if existing_relation and existing_relation.id != self.id:
                    raise ValueError(f"Project id: {project_id} and Tech id: {tech_id} have a defined relationship")
            
            return value