from resources.user import UserList

from config import api, app

api.add_resource(UserList, "/users")

if __name__ == '__main__':
    app.run(port=5555, debug=True)