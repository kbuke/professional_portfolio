from resources.user import UserList
from resources.institute import InstituteList
from resources.project import ProjectList
from resources.paragraph import ParagraphList
from resources.point import PointsList

from config import api, app

api.add_resource(UserList, "/users")
api.add_resource(InstituteList, "/institutes")
api.add_resource(ProjectList, "/projects")
api.add_resource(ParagraphList, "/paragraphs")
api.add_resource(PointsList, "/points")

if __name__ == '__main__':
    app.run(port=5555, debug=True)