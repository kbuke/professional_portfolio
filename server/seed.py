from models.user import UserModel
from models.institute import InstituteModel

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

        print("Finished seeding.")