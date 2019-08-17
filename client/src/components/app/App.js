import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Homepage from '../homepage/Homepage';
import Profile from '../profile/Profile';


const App = () => (
  <div className="App">
    <Router>
      <header className="App-header">
        <Link to='/'>Sebra</Link>
      </header>
      <Route path='/' render={ ({ history }) => <Homepage history={ history }/> }/>
      <Route path='/profile' render={ () => <Profile/> }/>
    </Router>
  </div>
)


export default App;
