import os, shelve, json, hashlib
from flask import Flask, g, session, request
from flask_restful import Resource, Api, reqparse
from libra_actions import account, balance, mint, transfer

app = Flask(__name__)
app.secret_key = os.urandom(24)
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


#-----------REGISTER-----------
#req params: 
#   -username 
#   -password
@app.route('/api/register', methods=['POST'])
def register():
    shelf = get_db()
    #POST: registering new      
    if(request.form.get('username') in shelf):
        return json.dumps({'message': 'error', 'data': 'User already registered.'})
    acc = account()
    acc['password'] = hashlib.md5(request.form.get('password').encode('utf-8')).hexdigest()
    acc['username'] = request.form.get('username')
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
    return json.dumps({'message': 'success', 'data': ret})

#-----------LOG IN-----------
# req params: 
#   -username
#   -password
@app.route('/api/login', methods=['POST'])
def login():
    reqParsed = {}
    username =  request.form.get('username')
    password =  request.form.get('password')
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
        return json.dumps({'message': 'success', 'data': ret})
    else:
        return json.dumps({'message': 'Not authorized'})



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
    recipientAddress =  request.form.get('recipientAddress')
    amount =  request.form.get('amount')
    senderUsername=  request.form.get('senderUsername')
    shelf = get_db()

    if ('user' in session and session['user'] == senderUsername):
        senderMnemonic = shelf[senderUsername]['mnemonic']
        resp = transfer(senderMnemonic, recipientAddress, amount)
        return json.dumps({'message': 'Success', 'data': 'Transferred ' + amount + 'to ' + recipientAddress})
    else :
        return json.dumps({'message': 'Not authorized'})


#-----------REGISTER BUSINESS-----------
#req params: 
#   -username
#   -password
@app.route('/api/businessregister', methods=['POST'])
def businessregister():
    shelf = get_db()
    #POST: registering new      
    if(request.form.get('username') in shelf):
        return json.dumps({'message': 'error', 'data': 'Business already registered.'})

    acc = account()
    acc['password'] = hashlib.md5(request.form.get('password').encode('utf-8')).hexdigest()
    acc['username'] = request.form.get('username')
    shelf[acc['username']] = acc
    session['user'] = acc['username']
    ret = {}
    ret['username'] = acc['username']
    ret['address'] = acc['address']
    ret['accountBalance'] = balance(acc['address'])
    ret['type'] = "business"

    return json.dumps({'message': 'success', 'data': ret})



#-----------LOG IN Business-----------
# req params: 
#   -username
#   -password
@app.route('/api/businesslogin', methods=['POST'])
def businesslogin():
    username =  request.form.get('username')
    password =  request.form.get('password')
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
        return json.dumps({'message': 'success', 'data': ret})
    else:
        return json.dumps({'message': 'Not authorized'})

