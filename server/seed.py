from models.user import UserModel

from app import app 
from config import db 

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