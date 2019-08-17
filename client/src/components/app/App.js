import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Homepage from '../homepage/Homepage';
import CreateAccount from '../createAccount/CreateAccount';
import Account from '../account/Account';
import CompletedPayment from '../completedPayment/CompletedPayment';


const App = () => (
  <Router>
    <Route exact path='/' render={ ({ history }) => <Homepage history={ history }/> }/>
    <Route path='/create-account' render={ ({ history }) => <CreateAccount history={ history }/> }/>
    <Route exact path='/account/:customerId' render={ ({ match, history }) => <Account customerId={ match.params.customerId } history={ history }/> }/>
    <Route path='/account/:customerId/completed' render={ ({ history }) => <CompletedPayment history={ history }/> }/>
  </Router>
)


export default App;
