from flask import make_response, session, request
from flask_restful import Resource

from models.Reviews import ReviewModel

from config import db 

class ReviewList(Resource):
    def get(self):
        reviews = [review.to_dict() for review in ReviewModel.query.all()]
        return reviews, 201

    def post(self):
        json = request.get_json()

        if json:
            try:
                new_review = ReviewModel(
                    name = json.get("name"),
                    image = json.get("image"),
                    rating = json.get("reviewRating"),
                    review = json.get("review"),
                    position = json.get("position"),
                    place_of_relation = json.get("company")
                )
                db.session.add(new_review)
                db.session.commit()
                return new_review.to_dict(), 201 
            
            except ValueError as e:
                return{"error": [str(e)]}, 400 

class Review(Resource):
    def get(self, id):
        review = ReviewModel.query.filter(ReviewModel.id==id).first()
        if review:
            return review.to_dict(), 201
        else:
            return {"error": f"Review {id} not found"}, 404 
    
    def patch(self, id):
        review = ReviewModel.query.filter(ReviewModel.id == id).first()
        data = request.get_json()

        if review:
            try:
                for attr in data:
                    setattr(review, attr, data[attr])
                db.session.add(review)
                db.session.commit()
            except ValueError as e:
                return{"error": [str(e)]}
        else:
            return {"error": f"Could not find review {id}"}, 404 
    
    def delete(self, id):
        review = ReviewModel.query.filter(ReviewModel.id).first()
        if review:
            db.session.delete(review)
            db.session.commit()
            return {"message": f"Review {id} deleted"}, 200
        else:
            return {"error": f"Review {id} not found"}, 404