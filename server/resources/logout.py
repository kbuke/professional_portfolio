from flask import session, make_response, request
from flask_restful import Resource

from config import db

import os 

from models.user import UserModel

class Logout(Resource):
    pass