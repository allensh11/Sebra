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
    <Route exact path='/(login|create-account)' render={ ({ location, match, history }) => <Auth pathname={ location.pathname } params={ match.params } history={ history }/> }/>
    <Route path='/(login|create-account)/:recipientAddress' render={ ({ location, match, history }) => <Auth pathname={ location.pathname } params={ match.params } history={ history }/> }/>
    <Route exact path='/account' render={ ({ history }) => <Account history={ history }/> }/>
    <Route path='/account/completed' render={ ({ history }) => <CompletedPayment history={ history }/> }/>
    <Route exact path='/dashboard' render={ ({ history }) => <Dashboard history={ history }/> }/>
  </Router>
)


export default App;
