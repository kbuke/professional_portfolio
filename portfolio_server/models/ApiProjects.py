from config import db 

from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin


class ApiProjects(db.Model, SerializerMixin):
    __tablename__ = "api_projects"

    id = db.Column(db.Integer, primary_key = True)
    project_id = db.Column(db.ForeignKey("projects.id"))
    api_id = db.Column(db.ForeignKey("APIs.id"))

    # VALIDATIONS
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
        api_id = value if key == "api_id" else self.api_id

        if project_id is not None and api_id is not None:
            existing_relation = ApiProjects.query.filter_by(
                api_id=api_id,
                project_id=project_id
            ).first()
            if existing_relation and existing_relation.id != self.id:
                return{"error": "This relationship is already defined"}