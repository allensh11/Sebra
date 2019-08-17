import React from 'react';
import { Link } from 'react-router-dom';
import './CreateAccount.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: 'white'
  },
  formContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: '32px'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing(1),
  },
}));


const CreateAccount = ({ history }) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    username: '',
    password: '',
    error: ''
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div className={classes.container}>
      <header className="Account-header">
        <Link to='/'>Welcome to Sebra!</Link>
        <h3>Create your account.</h3>
      </header>
      <form className={classes.formContainer} noValidate autoComplete="off">
        <TextField
          required
          autoFocus
          id="username"
          label="Username"
          className={classes.textField}
          value={values.username}
          onChange={handleChange('username')}
          margin="normal"
        />
        <TextField
          required
          id="password"
          label="Password"
          className={classes.textField}
          value={values.password}
          onChange={handleChange('password')}
          margin="normal"
        />
        <Button onClick={ () => history.push('/account/123')} variant="contained" color="primary" className={classes.button}>Create</Button>
      </form>
    </div>
  );
}

export default CreateAccount;