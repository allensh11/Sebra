import markdown
import os
import shelve
from flask import Flask, g
from flask_restful import Resource, Api, reqparse
from libra_actions import account, balance, mint, qr_create, getAccount
import json

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
        wallets = []
        mnemonic = ''
        ac = ''
        for key in keys:
            #mnemonic = shelf[key].mnemonic
            ac = shelf[key]
            mnemonic = ac['address']
            #mnemonic = ac['mnemonic']
            #wallets.append(account(mne))
        return {'message': 'Success', 'data': mnemonic}
    
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
        parser.add_argument('mnemonic', required=True)
        parser.add_argument('amount', required=True)
        args = parser.parse_args()

        ret = mint(args['mnemonic'], 100)
        acc = getAccount(args['mnemonic'])
        bal = balance(acc)
        return {'message': 'Minted2. Balance follows...', 'data': bal}, 200

class LibraWallet(Resource):
    def delete(self, id):
        shelf = get_db()
        if not (id in shelf):
            return {'message': 'wallet not found', 'data': {}}, 404
        del shelf[id]
        return '', 204
        
api.add_resource(LibraOperations, '/libra')
api.add_resource(LibraMinter, '/mint')
api.add_resource(LibraWallet, '/libra/<string:mnemonic>')