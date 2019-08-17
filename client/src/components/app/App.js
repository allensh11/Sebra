import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Homepage from '../homepage/Homepage';
import Profile from '../profile/Profile';


const App = () => (
  <div className="App">
    <header className="App-header">
        <h1>Sebra</h1>
    </header>
    <Router>
      <Route path='/' render={ ({ history }) => <Homepage history={ history }/> }/>
      <Route path='/profile' render={ () => <Profile/> }/>
    </Router>
  </div>
)


export default App;
