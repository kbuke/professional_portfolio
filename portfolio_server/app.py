from config import api, app

from resources.Projects import ProjectList, Project

from resources.Institutes import InstituteList

api.add_resource(ProjectList, "/projects")
api.add_resource(Project, "/projects/<int:id>")

api.add_resource(InstituteList, "/institutes")

if __name__ == "__main__":
    app.run(port = 5555, debug = True)