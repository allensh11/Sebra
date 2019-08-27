import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Nav from '../Nav';
import Auth from '../Auth';
import Account from '../Account';
import CompletedPayment from '../CompletedPayment';
import Dashboard from '../Dashboard';


const App = () => (
  <Router>
    <Route render={ ({ location, history }) => <Nav pathname={ location.pathname } history={ history }/> } />
    <Route path='/(login|create-account)' render={ ({ location, history }) => <Auth pathname={ location.pathname } history={ history }/> }/>
    <Route exact path='/account/:customerId' render={ ({ match, history }) => <Account customerId={ match.params.customerId } history={ history }/> }/>
    <Route path='/account/:customerId/completed' render={ ({ history }) => <CompletedPayment history={ history }/> }/>
    <Route exact path='/dashboard/:businessId' render={ ({ match, history }) => <Dashboard businessId={ match.params.businessId } history={ history }/> }/>
  </Router>
)


export default App;
