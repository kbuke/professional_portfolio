from config import db 

from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin


class ApiProjects(db.Model, SerializerMixin):
    __tablename__ = "api_projects"

    id = db.Column(db.Integer, primary_key = True)
    project_id = db.Column(db.ForeignKey("projects.id"))
    tech_id = db.Column(db.ForeignKey("technologies.id"))

    # VALIDATIONS
    @validates("project_id", "tech_id")
    def validate_relation(self, key, value):
        # 1 - if no input is given return error
        if value is None:
            return {"error": "You must input both project and api id"}
        
        # 2 - check value is or can be converted to an integer
        if not isinstance(value, int):
            try:
                value = int(value)
            except ValueError:
                raise ValueError("id must be a string")
        
        # 3 - check the relationship doesnt alread exist
        project_id = value if key == "project_id" else self.project_id
        tech_id = value if key == "tech_id" else self.tech_id

        if project_id is not None and tech_id is not None:
            existing_relation = ApiProjects.query.filter_by(
                tech_id = tech_id,
                project_id = project_id
            ).first()
            if existing_relation and existing_relation.id != self.id:
                raise ValueError("This relationship is already defined")
        
        return value