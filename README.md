# Sebra 🦓
Sebra is a tool for online vendors to collect payments/donations through Libra. Vendors (businesses, content creators, musicians etc) can generate a code snippet to be integrated with their blog/online store etc. Sebra aims to create a simple user experience that allows users to make simple payments and vendors to get paid without dealing with the complexities of public/private keys. 

Workflow:
1) Vendor generates code snippet to add to their site. This generates a *'Pay with Libra'* button.

![Snippet](https://i.imgur.com/qxJ0HjZ.png)

2) Payer creates a new account or logs in via an existing account.
![Account](https://i.imgur.com/OK4V6je.png) 

3)  Payer completes payment
![Gateway](https://i.imgur.com/6gWInv1.png)

4) Done!
![Gateway](https://i.imgur.com/2oCeNV3.png) 


## Server Details
Created with Python. Utilises:
* PyLibra for integration with Libra Testnet (https://github.com/jnsead/pylibra)
* Flask for REST API capabilities (https://palletsprojects.com/p/flask/)
* Authentication uses JWT standard (https://jwt.io/introduction/)
* Docker for containerisation / deployment (https://www.docker.com/)

### Run Locally:
In the api directory, run: 
`docker-compose build` followed by `docker-compose up`
By default, the server is hosted on port `:80`

## Client Details
Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Run Locally:
In the client project directory, you can run: `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


# Demo Version:
See Demo on:
https://dgo.nz/hau0x/demo.html

## Credentials: 
Username:   payerdemo
Password: payer123

##Capabilities:
* Log In as above user to create a payment
* Registration of new users for payments
* Businesses can register using dropdown in the login box.
* To log in as the business receiving the payment in the above demo the following credentials can be used:
    Username: bizdemo
    Password: biz123
* To generate your own "Pay with Libra" code snippet, simply create a new account as a Business user.