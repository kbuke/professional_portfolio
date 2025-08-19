from resources.user import UserList, User

from resources.institute import InstituteList, Institute

from resources.qualification import QualificationList
from resources.project import ProjectList

from resources.paragraph import ParagraphList, Paragraph

from resources.point import PointsList
from resources.tech import TechList
from resources.project_tech import ProjectTechList

from config import api, app

api.add_resource(UserList, "/users")
api.add_resource(User, "/users/<int:id>")

api.add_resource(InstituteList, "/institutes")
api.add_resource(Institute, "/institutes/<int:id>")

api.add_resource(QualificationList, "/qualifications")


api.add_resource(ProjectList, "/projects")


api.add_resource(ParagraphList, "/paragraphs")
api.add_resource(Paragraph, "/paragraphs/<int:id>")


api.add_resource(PointsList, "/points")


api.add_resource(TechList, "/tech")


api.add_resource(ProjectTechList, "/projecttech")

if __name__ == '__main__':
    app.run(port=5555, debug=True)