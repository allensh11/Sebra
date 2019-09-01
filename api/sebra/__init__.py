import os, shelve, json, hashlib, jwt, datetime
from flask import Flask, g, session, request, jsonify
from flask_restful import Resource, Api, reqparse
from libra_actions import account, balance, mint, transfer
from flask_cors import CORS


app = Flask(__name__)
app.secret_key = os.urandom(24)
app.config['SECRET_KEY'] = 'zOm!7e0ei71'

#Allow cross-domain communication between client and server.
#TODO: Deploy both on the same domain - DOCKERFILE updates required.
CORS(app, supports_credentials=True)

api = Api(app)

#Gets our Shelve DB
def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = shelve.open("sebra.db", writeback=True)
    return db

#Close DB context
@app.teardown_appcontext
def teardown_db(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

#Root - can probably remove.
@app.route('/')
def index():
    return 'Ok'

#Decode JWT token, check for validity
def verifyToken(token):
    try:
        data = jwt.decode(token, app.config['SECRET_KEY'])
        return data
    except:
        return None

#Standard response between authenticating and verifying logged in users
#via JWT tokens
def returnSuccessfulLogin(username, mnemonic, userType):
    ret = {}
    acc = account(mnemonic)
    ret['username'] = username
    ret['address'] = acc['address']
    ret['accountBalance'] = balance(acc['address'])
    ret['type'] = userType
    tokenResp = jwt.encode({'user': username, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60)}, app.config['SECRET_KEY'])
    ret['token'] = tokenResp.decode('UTF-8')
    return ret

#-----------LOG IN-----------
# req params: 
#   -username
#   -password
@app.route('/api/auth', methods=['POST', 'GET'])
def auth():
    token = None
    if(request.method == 'GET' and 'authorization' in request.headers):
        token = request.headers.get('authorization')
        data = verifyToken(token)
        userFromData = None
        if(data is not None and 'user' in data):
            userFromData = data['user']
            session['user'] = userFromData
            shelf = get_db()
            ret = returnSuccessfulLogin(userFromData, shelf[userFromData]['mnemonic'], shelf[userFromData]['type'])
            response = jsonify({'message': 'success', 'data': ret})
            return response
        else:
            response = jsonify({'message': 'Token invalid'}), 401
            return response
    else:   
        data = request.get_json() 
        username =  data['username'].lower()
        password =  data['password']
        shelf = get_db()
        if(username not in shelf):
            return json.dumps({'message': 'error', 'data': 'User not registered.'}), 401
        passStored = shelf[username]['password']
        passProvided = hashlib.md5(password.encode('utf-8')).hexdigest()
        if(passStored == passProvided):
            session['user'] = username
            ret = returnSuccessfulLogin(username, shelf[username]['mnemonic'], shelf[username]['type'])
            response = jsonify({'message': 'success', 'data': ret})
            return response
        else:
            response = jsonify({'message': 'Not authorized'})
            return response, 401
   

#-----------REGISTER BUSINESS-----------
#req params: 
#   -username
#   -password
@app.route('/api/businessRegister', methods=['POST'])
def businessregister():
    shelf = get_db()
    data = request.get_json()
    #POST: registering new      
    if(data['username'].lower() in shelf):
        response = jsonify({'message': 'error', 'data': 'Business already registered.'})
        return response, 409
    acc = account()
    acc['password'] = hashlib.md5(data['password'].encode('utf-8')).hexdigest()
    acc['username'] = data['username'].lower()
    acc['type'] = "business"
    shelf[acc['username']] = acc
    session['user'] = acc['username']
    ret = {}
    ret['username'] = acc['username']
    ret['address'] = acc['address']
    ret['accountBalance'] = balance(acc['address'])
    ret['type'] = acc['type']
    response = jsonify({'message': 'success', 'data': ret})
    return response



#-----------LOG IN Business-----------
# req params: 
#   -username
#   -password
@app.route('/api/businessLogin', methods=['POST'])
def businesslogin():
    data = request.get_json()
    username =  data['username'].lower()
    password =  data['password']
    shelf = get_db()
    if(username not in shelf ):
        response = jsonify({'message': 'error', 'data': 'Business not registered.'})
        return response, 401
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
        return response
    else:
        response = jsonify({'message': 'Not authorized'})
        return response, 401



#-----------REGISTER-----------
#req params: 
#   -username 
#   -password
@app.route('/api/register', methods=['POST'])
def register():
    shelf = get_db()
    #POST: registering new     
    data = request.get_json() 
    if(data['username'].lower() in shelf):
        response = jsonify({'message': 'error', 'data': 'User already registered.'})
        return response, 409
    acc = account()
    acc['password'] = hashlib.md5(data['password'].encode('utf-8')).hexdigest()
    acc['username'] = data['username'].lower()
    acc['type'] = "customer"
    acc['sequenceNumber'] = 0
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
    return response

#-----------LOG IN-----------
# req params: 
#   -username
#   -password
@app.route('/api/login', methods=['POST'])
def login():
    response = jsonify({'message': 'No longer valid method...'})
    return response, 401 


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
    token = request.headers.get('authorization')
    data = verifyToken(token)
    userFromData = None
    if(data is not None and 'user' in data and data['user'] == senderUsername):
        senderMnemonic = shelf[senderUsername]['mnemonic']
        sequenceNumber = 0
        if('sequenceNumber' in shelf[senderUsername]):
            sequenceNumber = shelf[senderUsername]['sequenceNumber']
        newSequenceNumber = transfer(senderMnemonic, recipientAddress, amount, sequenceNumber)
        shelf[senderUsername]['sequenceNumber'] = newSequenceNumber
        shelf.sync()
        shelf.close()
        ret = {}
        ret['transferAmount'] = amount
        ret['sequenceNumber'] = newSequenceNumber
        ret['recipientAddress'] = recipientAddress
        response = jsonify({'message': 'Success', 'data': ret})
        return response
    else :
        response = jsonify({'message': 'Not authorized', 'session': 'none'})
        return response, 401
