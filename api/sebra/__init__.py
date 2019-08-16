import markdown
import os
import shelve
from flask import Flask, g
from flask_restful import Resource, Api, reqparse
from libra_actions import account, balance, mint, qr_create


app = Flask(__name__)
api = Api(app)

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = shelve.open("devices.db")
    return db

@app.teardown_appcontext
def teardown_db(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

@app.route("/")
def index():
    content = "hello from after change"
    return markdown.markdown(content)


class LibraOperations(Resource):
    def get(self):
        shelf = get_db()
        keys = list(shelf.keys())

        devices = []

        for key in keys:
            devices.append(shelf[key])
        return {'message': 'Success', 'data': devices}
    
    def put(self):
        shelf = get_db()
        newWallet = account()
        shelf[newWallet['address']] = newWallet
        return {'message': 'Success - wallet created', 'data': newWallet}

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id', required=True)
        parser.add_argument('name', required=True)
        args = parser.parse_args()
        shelf = get_db()
        shelf[args['id']] = args
        return {'message': 'Wallet added', 'data': args}, 201

class LibraMinter(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('mneumonic', required=True)
        parser.add_argument('amount', required=True)
        args = parser.parse_args()
        retrievedAccount = account(args['mneumonic'])
        mint(retrievedAccount, 1000)
        return {'message': 'Minted. Balance follows...', 'data': retrievedAccount}, 200

class LibraWallet(Resource):
    def get(self, id):
        shelf = get_db()
        if not (id in shelf):
            return {'message': 'wallet not found', 'data': {}}, 404
        return {'message': 'Wallet found', 'data': shelf[id]}, 200


    def delete(self, id):
        shelf = get_db()
        if not (id in shelf):
            return {'message': 'wallet not found', 'data': {}}, 404
        del shelf[id]
        return '', 204
        
api.add_resource(LibraOperations, '/libra')
api.add_resource(LibraMinter, '/mint')
api.add_resource(LibraWallet, '/libra/<string:id>')