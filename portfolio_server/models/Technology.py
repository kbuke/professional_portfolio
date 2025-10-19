from config import db 
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

class TechnologyModel(db.Model, SerializerMixin):
    __tablename__ = "technologies"

    id = db.Column(db.Integer, primary_key = True)
    tech_name = db.Column(db.String)
    tech_img = db.Column(db.String)
    tech_type = db.Column(db.String)

    # RELATIONS
    # relation with bacendTech
    project_back_end = db.relationship("ProjectModel", back_populates = "backend", secondary = "backend_tech")

    # relation with frontendTech
    project_front_end = db.relationship("ProjectModel", back_populates = "frontend", secondary = "front_end_tech")

    # relation with cloud tech
    project_cloud = db.relationship("ProjectModel", back_populates = "cloud", secondary = "cloud_projects")

    # SERIALIZATION
    serialize_rules = (
        "-project_front_end.frontend",
        "-project_front_end.backend",
        "-project_front_end.cloud",

        "-project_back_end.backend",
        "-project_back_end.frontend",
        "-project_back_end.cloud",

        "-project_cloud.frontend",
        "-project_cloud.backend",
        "-project_cloud.cloud",
    )

    # VALIDATIONS
    @validates("tech_name", "tech_type")
    def validate_tech(self, key, value):
        if value is None or "":
            raise ValueError("Please enter a valid name.")
        
        if not isinstance(value, str):
            raise ValueError("Value must be a string")
        
        if key == "tech_type":
            allowed_tech = ["API", "Frontend", "Backend", "Cloud"]
            if value not in allowed_tech:
                raise ValueError("Tech must be one of either API, Ftrontend, Backend or Cloud")
        
        # if isinstance(value, str):
        #     existing = TechnologyModel.query.filter(TechnologyModel.tech_name == value).first()
        #     if existing and self.id != existing.id:
        #         raise ValueError(f"{value} is already regustered on this app.")
        tech_name = value if key == "tech_name" else self.tech_name
        tech_type = value if key == "tech_type" else self.tech_type
        existing_relation = TechnologyModel.query.filter_by(
            tech_type = tech_type,
            tech_name = tech_name
        ).first()
        if existing_relation and existing_relation.id != self.id:
            raise ValueError("This relation already exists.")
        
        return value