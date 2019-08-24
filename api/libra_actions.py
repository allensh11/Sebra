#Libra Wallet in Python 
from pylibra import LibraClient, LibraWallet
from pylibra.transaction import TransferTransaction
import pyqrcode, sys

client = LibraClient()

def account(words=None):
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

def accountByIndex(index, words=None):
    wallet = LibraWallet() if words is None else LibraWallet(words)
    account = wallet.get_account(int(index))
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
    
def transfer(senderMnemonic, recipientMnemonic, amount):
    senderWallet = LibraWallet(senderMnemonic)
    recipientWallet = LibraWallet(recipientMnemonic)

    senderAccount = senderWallet.get_account(0)
    recipientAccount = recipientWallet.get_account(0)
    # Create a transfer transaction object to send 0.001 Libra to account2
    tx = TransferTransaction(recipientAccount.address, int(amount)*1000000)
    # Or to send to a plain hex address

    # You can send a transaction by calling `send_transaction` function, which takes a sender `Account` and a `Transaction` object. You can also optionally passed `max_gas_amount`, `gas_unit_price`, and `expiration_time`. 
    ret = client.send_transaction(senderAccount, tx, max_gas_amount=10000000, gas_unit_price=100, expiration_time=1566655079)
    return ret 

def qr_create(address):
    qr = pyqrcode.create(address)
    return qr.text().replace("0","⬜").replace("1","⬛")
