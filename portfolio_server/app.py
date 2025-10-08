from config import api, app

from resources.Projects import ProjectList, Project

from resources.Institutes import InstituteList, Institute

from resources.ProjectPoints import ProjectPointsList, ProjectPoint

from resources.ProjectParagraphs import ProjectParagraphList, Paragraph

from resources.Technology import TechnologyList, Technology

from resources.User import UserList, User

from resources.SocialMedia import SocialMediaLists, SocialMedia

from resources.Qualifications import QualificationList, Qualification

from resources.Login import Login

from resources.CheckSession import CheckSession

from resources.Logout import Logout

from resources.Email import EmailList

from resources.BackendProject import BackEndProjectList, BackEndProject

from resources.FrontEndProject import FrontEndProjectList

from resources.Api import ApiList

api.add_resource(ProjectList, "/projects")
api.add_resource(Project, "/projects/<int:id>")

api.add_resource(InstituteList, "/institutes")
api.add_resource(Institute, "/institutes/<int:id>")

api.add_resource(ProjectPointsList, "/points")
api.add_resource(ProjectPoint, "/points/<int:id>")

api.add_resource(ProjectParagraphList, "/paragrahps")
api.add_resource(Paragraph, "/paragrahps/<int:id>")

api.add_resource(TechnologyList, "/technologies")
api.add_resource(Technology, "/technologies/<int:id>")

api.add_resource(UserList, "/users")
api.add_resource(User, "/users/<int:id>")

api.add_resource(SocialMediaLists, "/socials")
api.add_resource(SocialMedia, "/socials/<int:id>")

api.add_resource(QualificationList, "/qualifications")
api.add_resource(Qualification, "/qualifications/<int:id>")

api.add_resource(CheckSession, "/session")

api.add_resource(Login, "/login")

api.add_resource(Logout, "/logout")

api.add_resource(EmailList, "/emails")

api.add_resource(BackEndProjectList, "/backendtech")
api.add_resource(BackEndProject, "/backendtech/<int:id>")

api.add_resource(FrontEndProjectList, "/frontendtech")

api.add_resource(ApiList, "/apis")

if __name__ == "__main__":
    app.run(port = 5555, debug = True)