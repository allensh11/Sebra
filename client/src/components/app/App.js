import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Homepage from '../Homepage';
import CreateAccount from '../CreateAccount';
import Account from '../Account';
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
