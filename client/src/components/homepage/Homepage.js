import React from 'react';
import './Homepage.css';
import { Button } from 'reactstrap';


const Homepage = ({ history }) => (
  <div className="Homepage">
    <Button onClick={ () => history.push('/profile') } color='info'>Pay with Libra</Button>
  </div>
)


export default Homepage;