import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Homepage from '../homepage/Homepage';
import CreateAccount from '../createAccount/CreateAccount';


const App = () => (
  <Router>
    <Route exact path='/' render={ ({ history }) => <Homepage history={ history }/> }/>
    <Route path='/create-account' render={ () => <CreateAccount/> }/>
  </Router>
)


export default App;
