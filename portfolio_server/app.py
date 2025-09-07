from config import api, app

from resources.Projects import ProjectList

api.add_resource(ProjectList, "/projects")

if __name__ == "__main__":
    app.run(port = 5555, debug = True)