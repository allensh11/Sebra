import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions/auth';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  root: { flexGrow: 1, },
  nav: {
    [theme.breakpoints.down('1080')]: {
      marginTop: '-8px',
      minHeight: '45px'
    }
  },
  title: { 
    flexGrow: 1,
    fontSize: '27px',
    [theme.breakpoints.down('1080')]: {
      marginTop: '8px',
      fontSize: '18px'
    } 
  },
  link: {
    color: 'white',
    textDecoration: 'none'
  },
  button: {
    [theme.breakpoints.down('1080')]: {
      fontSize: '12px',
      margin: '9px -9px 0px 0px'
    } 
  }
}));

const Nav = ({ pathname, history }) => {
  const _pathname = pathname.split('/').slice(-2);
  let recipientAddress = null;
  if(typeof Number(_pathname[0]) === 'number') recipientAddress = Number(_pathname[0]);
  let chargeAmount = null;
  if(typeof Number(_pathname[1]) === 'number') chargeAmount = Number(_pathname[1]);
  
  const classes = useStyles();
  const auth = useSelector(store => store.auth);
  const dispatch = useDispatch();

  if(pathname === '/') auth.username ? history.push('/account') : history.push('/login'); 

  const handleSubmit = e => {
    e.preventDefault();
    if(auth.username) {
      recipientAddress && chargeAmount 
        ? dispatch(logout(history, recipientAddress, chargeAmount ))
        : dispatch(logout(history))
    }
    else {
      recipientAddress && chargeAmount 
        ? history.push(`/login/${recipientAddress}/${chargeAmount}`) 
        : history.push('/login')
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.nav}>
          <Typography variant="h6" className={classes.title}>
          <Link 
            to={ recipientAddress && chargeAmount ? `/login/${recipientAddress}/${chargeAmount}` : '/login' } 
            className={classes.link}
          >
            Sebra
          </Link>
          </Typography>
          <Button className={classes.button} onClick={ e => handleSubmit(e) } color="inherit">
            { auth.username ? 'Logout' : 'Login' }
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}


export default Nav;