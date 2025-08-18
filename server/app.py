from resources.user import UserList
from resources.institute import InstituteList
from resources.project import ProjectList

from config import api, app

api.add_resource(UserList, "/users")
api.add_resource(InstituteList, "/institutes")
api.add_resource(ProjectList, "/projects")

if __name__ == '__main__':
    app.run(port=5555, debug=True)