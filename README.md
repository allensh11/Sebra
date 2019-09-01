
# Sebra 🦓
Sebra is a tool for online vendors to collect payments/donations through Libra. Vendors (businesses, content creators, musicians etc) can generate a code snippet to install be integrated with their blog/online store etc. Sebra aims to create a simple user experience that allows users to make simple payments and vendors to get paid without dealing with the complexities of public/private keys. 


## Server
Created with Python. Utilises:
* PyLibra for integration with Libra Testnet (https://github.com/jnsead/pylibra)
* Flask for REST API capabilities (https://palletsprojects.com/p/flask/)
* Authentication uses JWT standard (https://jwt.io/introduction/)
* Docker for containerisation / deployment (https://www.docker.com/)

### Run Locally:
In the api directory, run: 
`docker-compose build` followed by `docker-compose up`
By default, the server is hosted on port `:80`

## Client
Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Run Locally:
In the client project directory, you can run: `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

