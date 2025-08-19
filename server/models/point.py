from sqlalchemy_serializer import SerializerMixin
from config import db
from sqlalchemy.orm import validates

class PointModel(db.Model, SerializerMixin):
    __tablename__ = "points"

    id = db.Column(db.Integer, primary_key=True)
    point = db.Column(db.String, nullable = False)

    # set up relatoions
        # one-to-many with projects
    project_id = db.Column(db.ForeignKey("projects.id"))
    projects = db.relationship("ProjectModel", back_populates="points")

    # set up validation
        # points should be unique with the same project_id

    # set up serialize rules
    serialize_rules=(
        "-projects.points",
    )