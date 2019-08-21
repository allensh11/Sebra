#Libra Wallet in Python
from pylibra import LibraClient, LibraWallet
from pylibra.transaction import TransferTransaction
import pyqrcode, sys

client = LibraClient()

def account(words=None):
    print("\n")
    wallet = LibraWallet() if words is None else LibraWallet(words)

    account = wallet.get_account(0)

    if client.get_account_state(account) == None or round(client.get_account_state(account).balance/1000000) == 0:
        balance = 0
    else:
        balance = round(client.get_account_state(account).balance/1000000)
    
    account_details = {
        'address': account.address,
        'mnemonic': wallet.to_mnemonic(),
        'public_key': account.public_key,
        'private_key': account.private_key,
        'balance': balance
    }
    return account_details

def getAccount(mnemonic):
    wallet = LibraWallet(mnemonic)
    return wallet.get_account(0)

def balance(account):
    account_state = client.get_account_state(account)
    if client.get_account_state(account) == None or round(client.get_account_state(account).balance/1000000) == 0:
        balance = 0
    else:
        balance = round(client.get_account_state(account).balance/1000000)
    return balance

def mint(mnemonic, amount):
    wallet = LibraWallet(mnemonic)
    account = wallet.get_account(0)
    client.mint_with_faucet(account, int(amount)*1000000)
    return balance(account)
    

def qr_create(address):
    qr = pyqrcode.create(address)
    return qr.text().replace("0","⬜").replace("1","⬛")
