import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/actions/auth';
import { createUser } from '../store/actions/users';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';


const useStyles = makeStyles(theme => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1.5%'
  },
  paperContainer: {
    padding: theme.spacing(3, 3),
  },
  headerContainer: {
    width: '100%',
    maxWidth: 500,
    margin: '20px 0px',
  },
  header1: {
    marginLeft: '8px'
  },
  header2: {
    margin: '50px 0px 50px 13px',
    fontWeight: 250
  },
  formContainer1: {
    backgroundColor: 'white'
  },
  formContainer2: {
    display: 'flex',
    flexDirection: 'column'
  },
  formControl: {
    margin: theme.spacing(1),
    width: '93%'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%'
  },
  error: {
    marginLeft: '8px'
  },
  textFieldType: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
    marginTop: '25px'
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    textAlign: 'right',
    marginTop: '41px',
    marginLeft: '76%',
    fontSize: '19px',
    padding: '20px 40px'
  },
  link: {
    textDecoration: 'none'
  }
}));

const types = [
  {
    value: 'customer',
    label: 'Customer',
  },
  {
    value: 'business',
    label: 'Business',
  },
];

const Auth = ({ pathname, params, history }) => {
  const { recipientAddress, chargeAmount } = params;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    username: '',
    password: '',
    type: 'customer',
    error: ''
  });

  const handleChange = id => e => setState({ ...state, [id]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();

    return pathname.slice(0, 6) === '/login' 
      ? dispatch(login(state, params, history))
          .catch(() => setState({ ...state, error: 'Invalid credentials! Please try again.'}))
      : dispatch(createUser(state, params, history))
          .then(() => dispatch(login(state, params, history)))
          .catch(() => setState({ ...state, error: 'Error! Username taken. Please try again.'}))
  }
  return (
    <div className={classes.mainContainer}>
      <Paper className={classes.paperContainer}>
        <div className={classes.headerContainer}>
          <Typography variant="h2" align="left" className={classes.header1}>Welcome to Sebra!</Typography>
          <Typography variant="h5" align="left" className={classes.header2}>
            { pathname.slice(0, 6) === '/login' ? 'Login.' : 'Create your account.' }  
          </Typography>
        </div>
        <div className={classes.formContainer1}>
          <form className={classes.formContainer2} noValidate autoComplete="off">
          <FormControl className={classes.formControl} error>
            <TextField
              required
              autoFocus
              fullWidth
              id="username"
              label="Username"
              className={classes.textField}
              value={state.username}
              onChange={handleChange('username')}
              margin="normal"
            />
            {
              state.error 
                ? <FormHelperText className={classes.error}>{state.error}</FormHelperText>  
                : null
            }
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              required
              fullWidth
              id="password"
              label="Password"
              className={classes.textField}
              value={state.password}
              onChange={handleChange('password')}
              margin="normal"
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              id="type"
              select
              label=""
              className={classes.textFieldType}
              value={state.type}
              onChange={handleChange('type')}
              SelectProps={{ MenuProps: { className: classes.menu }}}
              helperText="Please select type (Customer or Business)"
              margin="normal"
            >
            { types.map(option => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
            </TextField>
          </FormControl>
            <Button 
              onClick={ e => handleSubmit(e) } 
              disabled={ !state.username || !state.password }
              variant="contained" 
              color="primary" 
              className={classes.button}
            >
              { pathname.slice(0, 6) === '/login' ? 'Login' : 'Create' }  
            </Button>
          </form>
          { 
            pathname.slice(0, 6) === '/login' 
            ? <Typography variant="body2" align="left">
                <Link to={`/create-account/${recipientAddress}/${chargeAmount}`} className={classes.link}>New to Sebra? Create your account here.</Link>
              </Typography> 
            : null
          }
        </div>
      </Paper>
    </div>
  );
}


export default Auth;