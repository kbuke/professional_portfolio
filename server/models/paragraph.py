from sqlalchemy_serializer import SerializerMixin
from config import db 
from sqlalchemy.orm import validates

class ParagraphModel(db.Model, SerializerMixin):
    __tablename__ = "paragraphs"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=True)
    text = db.Column(db.String, nullable=False)
    img_1 = db.Column(db.String, nullable=True)
    img_2 = db.Column(db.String, nullable=True)

    # set up relation
        # one-to-many with projects
    project_id = db.Column(db.ForeignKey("projects.id"))
    projects = db.relationship("ProjectModel", back_populates="paragraphs")
    
    # set up validation
        # a title should be unique in the same project

    # set up serialize rules
    serialize_rules=(
        # "-projects.paragraphs",
        "-paragraphs.projects",
        "-institute",
    )