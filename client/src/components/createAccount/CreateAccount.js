import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './CreateAccount.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


class CreateAccount extends Component {

  state = {
    username: '',
    password: '',
    error: ''
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
    console.log(this.state)
    const { handleChange } = this;
    const { username, password/* , error */ } = this.state;
    return (
      <Fragment>
        <header className="Create-account-header">
          <Link to='/'>Welcome to Sebra!</Link>
          <h3>Create your account.</h3>
        </header>
        <Form className="Create-account">
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              onChange={ handleChange } 
              value={ username } 
              type="textarea" 
              id="username" 
              required
              autoFocus
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input 
              onChange={ handleChange } 
              value={ password } 
              type="password" 
              id="password"
              required
            />
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" />{' '}
              Remember Me
            </Label>
          </FormGroup>
          <Button color='primary'>Create</Button>
        </Form>
      </Fragment>
    );
  }
}


export default CreateAccount;