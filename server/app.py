from resources.user import UserList, User
from resources.institute import InstituteList, Institute
from resources.qualification import QualificationList, Qualification
from resources.project import ProjectList, Project
from resources.paragraph import ParagraphList, Paragraph
from resources.point import PointsList, Points
from resources.tech import TechList, Tech
from resources.project_tech import ProjectTechList, ProjectTech
from resources.email import EmailList, Email
from resources.login import Login
from resources.logout import Logout
from resources.check_session import CheckSession

from config import api, app

api.add_resource(UserList, "/users")
api.add_resource(User, "/users/<int:id>")

api.add_resource(InstituteList, "/institutes")
api.add_resource(Institute, "/institutes/<int:id>")

api.add_resource(QualificationList, "/qualifications")
api.add_resource(Qualification, "/qualifications/<int:id>")

api.add_resource(ProjectList, "/projects")
api.add_resource(Project, "/projects/<int:id>")

api.add_resource(ParagraphList, "/paragraphs")
api.add_resource(Paragraph, "/paragraphs/<int:id>")


api.add_resource(PointsList, "/points")
api.add_resource(Points, "/points/<int:id>")


api.add_resource(TechList, "/tech")
api.add_resource(Tech, "/tech/<int:id>")

api.add_resource(ProjectTechList, "/projecttech")
api.add_resource(ProjectTech, '/projecttech/<int:id>')

api.add_resource(EmailList, "/emails")
api.add_resource(Email, "/emails/<int:id>")

api.add_resource(Login, "/login")

api.add_resource(Logout, "/logout")

api.add_resource(CheckSession, "/check_session")

if __name__ == '__main__':
    app.run(port=5555, debug=True)