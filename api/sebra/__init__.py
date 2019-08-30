import os, shelve, json, hashlib
from flask import Flask, g, session, request, jsonify
from flask_restful import Resource, Api, reqparse
from libra_actions import account, balance, mint, transfer
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = os.urandom(24)
CORS(app)

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


@app.route('/')
def index():
    return 'Ok'




#-----------REGISTER BUSINESS-----------
#req params: 
#   -username
#   -password
@app.route('/api/businessRegister', methods=['POST'])
def businessregister():
    shelf = get_db()
    data = request.get_json()
    #POST: registering new      
    if(data['username'] in shelf):
        response = jsonify({'message': 'error', 'data': 'Business already registered.'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return json.dumps(response)

    acc = account()
    acc['password'] = hashlib.md5(data['password'].encode('utf-8')).hexdigest()
    acc['username'] = data['username']
    shelf[acc['username']] = acc
    session['user'] = acc['username']
    ret = {}
    ret['username'] = acc['username']
    ret['address'] = acc['address']
    ret['accountBalance'] = balance(acc['address'])
    ret['type'] = "business"
    response = jsonify({'message': 'success', 'data': ret})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response



#-----------LOG IN Business-----------
# req params: 
#   -username
#   -password
@app.route('/api/businessLogin', methods=['POST'])
def businesslogin():
    data = request.get_json()
    username =  data['username']
    password =  data['password']
    shelf = get_db()
    if(username not in shelf ):
        return json.dumps({'message': 'error', 'data': 'User not registered.'})
    passStored = shelf[username]['password']
    passProvided = hashlib.md5(password.encode('utf-8')).hexdigest()
    if(passStored == passProvided and shelf[username]['type'] == 'business'):
        session['user'] = username
        acc = account(shelf[username]['mnemonic'])
        ret = {}
        ret['username'] = username
        ret['address'] = acc['address']
        ret['accountBalance'] = balance(acc['address'])
        ret['type'] = "business"
        response = jsonify({'message': 'success', 'data': ret})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    else:
        response = jsonify({'message': 'Not authorized'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response



#-----------REGISTER-----------
#req params: 
#   -username 
#   -password
@app.route('/api/register', methods=['POST'])
def register():
    shelf = get_db()
    #POST: registering new     
    data = request.get_json() 
    if(data['username'] in shelf):
        return json.dumps({'message': 'error', 'data': 'User already registered.'})
    acc = account()
    acc['password'] = hashlib.md5(data['password'].encode('utf-8')).hexdigest()
    acc['username'] = data['username']
    acc['type'] = "customer"
    shelf[acc['username']] = acc
    ret = {}
    ret['username'] = acc['username']
    ret['address'] = acc['address']
    ret['accountBalance'] = balance(acc['address'])
    ret['type'] = "customer"
    #Mint new libra by mnemonic
    mintamount = 1000
    mint(acc['mnemonic'], mintamount)
    session['user'] = acc['username']
    response = jsonify({'message': 'success', 'data': ret})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

#-----------LOG IN-----------
# req params: 
#   -username
#   -password
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json() 
    username =  data['username']
    password =  data['password']
    shelf = get_db()
    if(username not in shelf):
        return json.dumps({'message': 'error', 'data': 'User not registered.'})
    passStored = shelf[username]['password']
    passProvided = hashlib.md5(password.encode('utf-8')).hexdigest()
    if(passStored == passProvided and shelf[username]['type'] == 'customer'):
        session['user'] = username
        ret = {}
        acc = account(shelf[username]['mnemonic'])
        ret['username'] = username
        ret['address'] = acc['address']
        ret['accountBalance'] = balance(acc['address'])
        ret['type'] = "customer"
        response = jsonify({'message': 'success', 'data': ret})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    else:
        response = jsonify({'message': 'Not authorized'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response


#-----------LOG OUT-----------
#req params: None
@app.route('/api/logout', methods=['POST'])
def logout():
    session.pop('user', None)
    return json.dumps({'message': 'success', 'data': 'logged out'})

#-----------TRANSACTIONS-----------
#req params:
#   -recipientAddress
#   -amount
#   -senderUsername
@app.route('/api/transaction', methods=['POST'])
def transaction():
    data = request.get_json()
    recipientAddress =  data['recipientAddress']
    amount =  data['amount']
    senderUsername=  data['username']
    shelf = get_db()

    if ('user' in session and session['user'] == senderUsername):
        senderMnemonic = shelf[senderUsername]['mnemonic']
        resp = transfer(senderMnemonic, recipientAddress, amount)
        response = jsonify({'message': 'Success', 'data': 'Transferred ' + amount + 'to ' + recipientAddress})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    else :
        response = jsonify({'message': 'Not authorized'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

@app.route('/api/accountDetails', methods=['POST'])
def accountDetails():
    if ('user' in session):
        shelf = get_db()
        ret = {}
        ret['username'] = session['user']
        ret['address'] = shelf[session['user']]['address']
        ret['balance'] = balance(ret['address']) 
        ret['type'] =  shelf[session['user']]['type']
        response = jsonify({'message': 'Success', 'data': ret})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    else :
        response = jsonify({'message': 'Not authorized'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

