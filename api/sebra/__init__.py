import os
import shelve
from flask import Flask, g
from flask_restful import Resource, Api, reqparse
from libra_actions import account, balance, mint, qr_create, getAccount

app = Flask(__name__)
api = Api(app)

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = shelve.open("sebra.db")
    return db

@app.teardown_appcontext
def teardown_db(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

@app.route("/")
def index():
    content = "Ok"
    return content


class LibraAccount(Resource):
    #Getting all wallets...
    def get(self):
        shelf = get_db()
        keys = list(shelf.keys())
        wallets = []
        for key in keys:
            ac_details = shelf[key]
            mnemonic2 = ac_details['mnemonic'] #throws error...why?
        return {'message': 'Success', 'data': ac_details['mnemonic']} #doesn't...
    
        shelf = get_db()
        newWallet = account()
        shelf[newWallet['address']] = newWallet
        return {'message': 'Success - wallet created', 'data': newWallet}

    #registering new user
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id', required=True)
        parser.add_argument('username', required=True)
        parser.add_argument('password', required=True)
        parser.add_argument('mnemonic', required=True)
        args = parser.parse_args()
        shelf = get_db()
        shelf[args['id']] = args
        #Mint new Libra by Mnemonic
        mint(args['mnemonic'], 1000)
        return {'message': 'Wallet added', 'data': getAccount(args['mnemonic'])}, 201

class LibraWallet(Resource):
    def transferBal(self):
        return {'message': 'Transferred', 'data': getAccount(args['mnemonic'])}, 201
    #Can a wallet be destroyed from the testnet? Or just from our DB...
    def delete(self, id):
        shelf = get_db()
        if not (id in shelf):
            return {'message': 'wallet not found', 'data': {}}, 404
        del shelf[id]
        return '', 204
        
api.add_resource(LibraOperations, '/libra')
api.add_resource(LibraMinter, '/mint')
api.add_resource(LibraWallet, '/libra/<string:mnemonic>')