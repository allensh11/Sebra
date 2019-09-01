#Libra Wallet in Python 
from pylibra import LibraClient, LibraWallet
from pylibra.transaction import TransferTransaction
import pyqrcode, sys
from pylibra.proto.transaction_pb2 import TransactionArgument
from pylibra.transaction import CustomTransaction, TransferTransaction
from pylibra.proto.admission_control_pb2 import SubmitTransactionRequest
from pylibra.proto.transaction_pb2 import SignedTransaction
from pylibra.proto.transaction_pb2 import RawTransaction
from sha3 import sha3_256
import time

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
    
def transfer(senderMnemonic, recipientAddress, amount, sequenceNumber):
    senderWallet = LibraWallet(senderMnemonic)

    senderAccount = senderWallet.get_account(0)
    # # Create a transfer transaction object to send 0.001 Libra to account2
    # tx = TransferTransaction(recipientAddress, int(amount)*1000000)
    # # Or to send to a plain hex address

    # # You can send a transaction by calling `send_transaction` function, which takes a sender `Account` and a `Transaction` object. You can also optionally passed `max_gas_amount`, `gas_unit_price`, and `expiration_time`. 
    # ret = client.send_transaction(senderAccount, tx, max_gas_amount=10000000, gas_unit_price=100, expiration_time=1866655079)
    # return ret 

    tx_script = '4c49425241564d0a010007014a00000004000000034e000000060000000c54000000060000000d5a0000000600000005600000002900000004890000002000000007a90000000e00000000000001000200010300020002040200030003020402063c53454c463e0c4c696272614163636f756e74046d61696e0f7061795f66726f6d5f73656e64657200000000000000000000000000000000000000000000000000000000000000000001020104000c000c0111010002'

    sequence_number = int(sequenceNumber)
    raw_tx = RawTransaction()
    raw_tx.sender_account = bytes.fromhex(senderAccount.address)
    raw_tx.sequence_number = sequence_number
    raw_tx.max_gas_amount = 100000
    raw_tx.gas_unit_price = 1
    raw_tx.expiration_time = int(time.time()) + 10
    raw_tx.program.code = bytes.fromhex(tx_script)
    arg1 = raw_tx.program.arguments.add()
    arg1.type = TransactionArgument.ADDRESS
    arg1.data = bytes.fromhex(recipientAddress)
    arg2 = raw_tx.program.arguments.add()
    arg2.type = TransactionArgument.U64
    arg2.data = (int(amount)*1000000).to_bytes(8, 'little') # Send 0.001 lib

    tx = raw_tx.SerializeToString()
    request = SubmitTransactionRequest()
    signed_tx = request.signed_txn
    signed_tx.raw_txn_bytes = tx
    signed_tx.sender_public_key = bytes.fromhex(senderAccount.public_key)
    hashfn = sha3_256()
    hashfn.update(
        bytes.fromhex('46f174df6ca8de5ad29745f91584bb913e7df8dd162e3e921a5c1d8637c88d16'))
    hashfn.update(tx)
    signature = senderAccount.sign(hashfn.digest())[:64]
    signed_tx.sender_signature = signature
    result = client.stub.SubmitTransaction(request)
    return sequence_number+1

def qr_create(address):
    qr = pyqrcode.create(address)
    return qr.text().replace("0","⬜").replace("1","⬛")
