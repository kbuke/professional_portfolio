from config import api, app

from resources.Projects import ProjectList, Project

api.add_resource(ProjectList, "/projects")
api.add_resource(Project, "/projects/<int:id>")

if __name__ == "__main__":
    app.run(port = 5555, debug = True)