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

#Return our react page?
@app.route("/")
def index():
    content = "Ok"
    return content

#-----------REGISTER-----------
#req params: 
#   -username
#   -password
@app.route('/register', methods=['GET', 'POST'])
def register():
    shelf = get_db()
    if(request.method == 'GET'):
        #HACK: Just gets all accounts. We should delete this later.
        keys = list(shelf.keys())
        accounts = []
        for key in keys:
            accountFromDb = shelf[key]
            accountFromDb['balance'] = balance(accountFromDb['address'])
            accounts.append(accountFromDb)
        ret = {'message': 'Success', 'data': accounts}
        return json.dumps(ret)
    elif(request.method == 'POST'):
        #POST: registering new      
        if(request.form.get('username') in shelf):
            return json.dumps({'message': 'error', 'data': 'User already registered.'})

        ret = account()
        ret['password'] = hashlib.md5(request.form.get('password').encode('utf-8')).hexdigest()
        ret['username'] = request.form.get('username')
        ret['type'] = "customer"
        shelf[ret['username']] = ret
        #Mint new libra by mnemonic
        mintamount = 1000
        mint(ret['mnemonic'], mintamount)
        session['user'] = ret['username']
        return json.dumps({'message': 'success', 'data': account(ret['mnemonic'])})


#-----------LOG IN-----------
# req params: 
#   -username
#   -password
@app.route('/login', methods=['GET'])
def login():
    reqParsed = {}
    username =  request.args.get('username')
    password =  request.args.get('password')
    shelf = get_db()
    if(username not in shelf):
        return json.dumps({'message': 'error', 'data': 'User not registered.'})
    passStored = shelf[username]['password']
    passProvided = hashlib.md5(password.encode('utf-8')).hexdigest()
    if(passStored == passProvided):
        session['user'] = username
        return json.dumps({'message': 'success', 'data': account(shelf[username]['mnemonic'])})
    else:
        return json.dumps({'message': 'Not authorized'})


#-----------LOG OUT-----------
#req params: None
@app.route('/logout', methods=['GET'])
def logout():
    session.pop('user', None)
    return json.dumps({'message': 'success', 'data': 'logged out'})


#-----------TRANSACTIONS-----------
#req params:
#   -recipientAddress
#   -amount
#   -senderUsername
@app.route('/transaction', methods=['GET'])
def transaction():

   

    recipientAddress =  request.args.get('recipientAddress')
    amount =  request.args.get('amount')
    senderUsername=  request.args.get('senderUsername')
    shelf = get_db()

    if ('user' in session and session['user'] == senderUsername):
        senderMnemonic = shelf[senderUsername]['mnemonic']
        resp = transfer(senderMnemonic, recipientAddress, amount)
        return json.dumps({'message': 'Success', 'data': 'Transferred ' + amount + 'to ' + recipientAddress})
    else :
        return json.dumps({'message': 'Not authorized'})


#Helper method to pass requests.
def parseRequest(requestObj):
    reqParsed = {}
    for key, value in requestObj:
        requestObj[ key ] = value
    return reqParsed