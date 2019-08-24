import os
import shelve
from flask import Flask, g
from flask_restful import Resource, Api, reqparse
from libra_actions import account, balance, mint, transfer
import time
import json


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
        accounts = []
        for key in keys:
            account = shelf[key]
            #TODO: Can be sped up by not worrying about returning balance??
            account['balance'] = balance(account['address'])
            accounts.append(account)
        return {'message': 'Success', 'data': accounts} 

    #registering new user
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', required=True)
        parser.add_argument('password', required=True)
        args = parser.parse_args()

        #TODO: password to be hashed...
        #TODO: How should we go about private key storage?
        newWallet = account()

        args['mnemonic'] = newWallet['mnemonic']
        args['address'] = newWallet['address']
        args['public_key'] = newWallet['public_key']
        args['private_key'] = newWallet['private_key']

        shelf = get_db()
        shelf[args['address']] = args

        #Mint new libra by mnemonic
        mint(args['mnemonic'], 1000)
        return {'message': 'Wallet added', 'data': account(args['mnemonic'])}, 201

class LibraTransaction(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('senderMnemonic', required=True)
        parser.add_argument('recipientMnemonic', required=True)
        parser.add_argument('amount', required=True)
        args = parser.parse_args()
        resp = transfer(args['senderMnemonic'], args['recipientMnemonic'], args['amount'])
        #ret = resp['id']
        return {'message': 'Transfer complete', 'data': 'ret'}, 200

    def put(self):
        parser = reqparse.RequestParser()
        parser.add_argument('recipientMnemonic', required=True)
        parser.add_argument('amountToMint', required=True)
        args = parser.parse_args()
        mint(args['recipientMnemonic'], args['amountToMint'])
        return {'message': 'Minted'}, 200



# class LibraWallet(Resource):
#     def transferBal(self):
#         return {'message': 'Transferred', 'data': account(args['mnemonic'])}, 201
#     #Can a wallet be destroyed from the testnet? Or just from our DB...
#     def delete(self, id):
#         shelf = get_db()
#         if not (id in shelf):
#             return {'message': 'wallet not found', 'data': {}}, 404
#         del shelf[id]
#         return '', 204
        
api.add_resource(LibraAccount, '/libra')
api.add_resource(LibraTransaction, '/transactions')
#api.add_resource(LibraWallet, '/libra/<string:mnemonic>')