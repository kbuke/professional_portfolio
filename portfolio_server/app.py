from config import api, app

from resources.Projects import ProjectList, Project

from resources.Institutes import InstituteList, Institute

from resources.ProjectPoints import ProjectPointsList, ProjectPoint

from resources.ProjectParagraphs import ProjectParagraphList, Paragraph

from resources.Technology import TechnologyList

api.add_resource(ProjectList, "/projects")
api.add_resource(Project, "/projects/<int:id>")

api.add_resource(InstituteList, "/institutes")
api.add_resource(Institute, "/institutes/<int:id>")

api.add_resource(ProjectPointsList, "/points")
api.add_resource(ProjectPoint, "/points/<int:id>")

api.add_resource(ProjectParagraphList, "/paragrahps")
api.add_resource(Paragraph, "/paragrahps/<int:id>")

api.add_resource(TechnologyList, "/technologies")

if __name__ == "__main__":
    app.run(port = 5555, debug = True)