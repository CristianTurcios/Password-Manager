from flask import Flask
from flask_restful import request, abort, Api, Resource, reqparse
from flask_cors import CORS

app = Flask(__name__)
api = Api(app)
CORS(app)

SITES = [
    {
        'id': '1',
        'name': 'Spotify',
        'username': 'johndoe@gmail.com',
        'logo': 'https://logodownload.org/wp-content/uploads/2016/09/Spotify-logo.png',
        'hasImage': True,
        'password': 'password',
        'url': 'https://www.spotify.com'
    },
    {
        'id': '2',
        'name': 'Netflix',
        'username': 'cturcios@gmail.com',
        'logo': 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png',
        'hasImage': True,
        'password': 'password',
        'url': 'https://www.netflix.com'
    },
    {
        'id': '3',
        'name': 'Google',
        'username': 'johndoe@gmail.com',
        'logo': 'https://storage.googleapis.com/support-forums-api/attachment/thread-38753685-12277661469546851254.jpg',
        'hasImage': True,
        'password': 'password',
        'url': 'https://www.google.com'
    },
    {
        'id': '4',
        'name': 'Amazon',
        'username': 'janedoe@gmail.com',
        'logo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png',
        'hasImage': True,
        'password': 'password',
        'url': 'https://www.amazon.com'
    },
    {
        'id': '5',
        'name': 'Facebook',
        'username': 'johndoe@gmail.com',
        'logo': 'https://logos-world.net/wp-content/uploads/2020/04/Facebook-Logo.png',
        'hasImage': True,
        'password': 'password',
        'url': 'https://www.facebook.com'
    },
    {
        'id': '6',
        'name': 'Linkedin',
        'username': 'janedoe@gmail.com',
        'logo': 'https://logodownload.org/wp-content/uploads/2019/03/linkedin-logo-1.png',
        'hasImage': True,
        'password': 'password',
        'url': 'https://www.linkedin.com'
    }
]

def abort_if_site_doesnt_exist(site_id):
    element = next((item for item in SITES if item['id'] == site_id), False)
    
    if not element:
        abort(404, message="Site {} doesn't exist".format(site_id))


parser = reqparse.RequestParser()

# Site
# shows a single site item and lets you delete a site item
class Site(Resource):
    def get(self, site_id):
        abort_if_site_doesnt_exist(site_id)
        element = next(item for item in SITES if item["id"] == site_id)
        return element

    def delete(self, site_id):
        abort_if_site_doesnt_exist(site_id)
        for i in range(len(SITES)):
            if SITES[i]['id'] == site_id:
                del SITES[i]
                break

        return '', 204

    def put(self, site_id):
        abort_if_site_doesnt_exist(site_id)
        data = request.json
        for i in range(len(SITES)):
            if SITES[i]['id'] == site_id:
                SITES[i]['id'] = data['id']
                SITES[i]['name'] = data['name']
                SITES[i]['username'] = data['username']
                SITES[i]['logo'] = data['logo']
                SITES[i]['hasImage'] = data['hasImage']
                SITES[i]['password'] = data['password']
                SITES[i]['url'] = data['url']
                break
        return 201

# SiteList
# shows a list of all sites stored, and lets you POST to add new Site
class SiteList(Resource):

    def get(self):
        return SITES

    def post(self):
        data = request.json
        next_id = int(SITES[-1]['id']) + 1
        data['id'] = str(next_id)
        SITES.append(data)
        return SITES, 201

##
## Actually setup the Api resource routing here
##
api.add_resource(SiteList, '/sites')
api.add_resource(Site, '/sites/<site_id>')

if __name__ == '__main__':
    app.run(host="0.0.0.0", port="5001", debug=True)