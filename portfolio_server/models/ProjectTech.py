from config import db 

from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates 

class ProjectTechModel(db.Model, SerializerMixin):
    __tablename__ = "project_technology"

    id = db.Column(db.Integer, primary_key = True)
    project_id = db.Column(db.ForeignKey("projects.id"))
    tech_id = db.Column(db.ForeignKey("technologies.id"))
    front_end = db.Column(db.Boolean)
    back_end = db.Column(db.Boolean)

    # RELATIONS
    technology = db.relationship("TechnologyModel", back_populates = "project_technologies")

    project = db.relationship("ProjectModel", back_populates = "project_technologies")

    # SERIALIZATION
    serialize_rules = (
        "-technology.project_technologies",
        "-project.project_technologies",
    )

    # VALIDATES
    @validates("front_end", "back_end")
    def validate_tech_end(self, key, value):
        if key == "front_end":
            front_end, back_end = value, self.back_end
        else: 
            front_end, back_end = self.front_end, value

        if front_end is not None or back_end is not None:
            if not (front_end or back_end):
                raise ValueError("Tech must be either front or back end.")

        return value