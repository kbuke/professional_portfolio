from models.user import UserModel
from models.institute import InstituteModel
from models.qualification import QualificationModel
from models.project import ProjectModel
from models.paragraph import ParagraphModel
from models.point import PointModel
from models.tech import TechModel
from models.project_tech import ProjectTechModel

from app import app 
from config import db 

from datetime import date

if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")

        db.drop_all()
        db.create_all()

        print("Beging seeding...")

        print("Seeding users...")
        kaanbuke = UserModel(
            name = "Kaan Buke",
            picture = "Will upload later",
            intro = "Will write that later too.",
            cv = "Will upload it later."
        )
        db.session.add_all([kaanbuke])
        db.session.commit()
        print("Finished seeding users")

        print("Seeding institutes...")
        esas = InstituteModel(
            name = "FlatIron School",
            img = "upload that later",
            position="Student",
            location="New York, USA",
            start_date=date(2023, 3, 23),
            end_date=date(2024, 9, 23),
            user_id = 1
        )
        db.session.add_all([esas])
        db.session.commit()
        print("Finished seeding institutes")

        print("Seeding qualifications...")
        flatiron_certificate = QualificationModel(
            title="Software Engineering Qualification",
            img_1="Will upload later",
            img_2=None,
            date=date(2024, 9, 23),
            institute_id=1
        )
        db.session.add_all([flatiron_certificate])
        db.session.commit()
        print("Finished seeding institutes")

        print("Seeding projects...")
        nihongo = ProjectModel(
            name = "Nihongo",
            title_img= "Will upload later",
            title_video = "Will also upload later",
            start_date = date(2024, 8, 1),
            end_date = date(2024, 9, 23),
            institute_id = 1
        )
        db.session.add_all([nihongo])
        db.session.commit()
        print("Finished seeding projects")

        print("Seeding project paragraphs")
        nihongo_1 = ParagraphModel(
            title="Nihongo's Goal",
            text="I want to make a cool application.",
            img_1="Insert later",
            img_2="Again, I'll insert later",
            project_id=1
        )
        db.session.add_all([nihongo_1])
        db.session.commit()
        print("Finished seeding project paragraphs")

        print("Seeding project points...")
        nihongo_point_1 = PointModel(
            point="An app for travel around Japan.",
            project_id=1
        )
        db.session.add_all([nihongo_point_1])
        db.session.commit()

        print("Seeding tech")
        javascript = TechModel(
            name="JavaScript",
            img="Will update later."
        )
        db.session.add_all([javascript])
        db.session.commit()
        print("Finished seeding tech")

        print("Seeding project tech")
        nihongo_js = ProjectTechModel(
            project_id=1,
            tech_id=1
        )
        db.session.add_all([nihongo_js])
        db.session.commit()
        print("Finished seeding project tech")

        print("Finished seeding.")