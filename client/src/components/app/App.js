import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Nav from '../Nav';
import Auth from '../Auth';
import Account from '../Account';
import Dashboard from '../Dashboard';


const App = () => (
  <Router>
    <Route render={ ({ location, history }) => <Nav pathname={ location.pathname } history={ history }/> } />
    <Route exact path='/(login|create-account)' render={ ({ location, match, history }) => <Auth pathname={ location.pathname } params={ match.params } history={ history }/> }/>
    <Route path='/(login|create-account)/:recipientAddress/:chargeAmount' render={ ({ location, match, history }) => <Auth pathname={ location.pathname } params={ match.params } history={ history }/> }/>
    <Route exact path='/(account|account/completed)' render={ ({ location, history }) => <Account pathname={ location.pathname } history={ history }/> }/>
    <Route exact path='/dashboard' render={ ({ history }) => <Dashboard history={ history }/> }/>
  </Router>
)


export default App;
