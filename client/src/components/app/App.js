import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
//import Homepage from '../Homepage';
import Nav from '../Nav';
import Auth from '../Auth';
import Account from '../Account';
import CompletedPayment from '../CompletedPayment';


const App = () => (
  <Router>
    {/* <Route exact path='/' render={ ({ history }) => <Homepage history={ history }/> }/> */}
    <Route render={ ({ history }) => <Nav history={ history }/> } />
    <Route path='/(login|create-account)' render={ ({ location, history }) => <Auth pathname={ location.pathname } history={ history }/> }/>
    <Route exact path='/account/:customerId' render={ ({ match, history }) => <Account customerId={ match.params.customerId } history={ history }/> }/>
    <Route path='/account/:customerId/completed' render={ ({ history }) => <CompletedPayment history={ history }/> }/>
  </Router>
)


export default App;
