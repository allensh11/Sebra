import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions/auth';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: 'white',
    textDecoration: 'none'
  }
}));

const Nav = ({ pathname, history }) => {
  const classes = useStyles();
  const auth = useSelector(store => store.auth);

  if(pathname === '/') {
    auth.id ? history.push(`/account/${auth.id}`) : history.push('/login'); 
  }

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    auth.id ? dispatch(logout(history)) : history.push('/login');
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          <Link to={ '/login' } className={classes.link}>Sebra</Link>
          </Typography>
          <Button onClick={ e => handleSubmit(e) } color="inherit">
            { auth.username ? 'Logout' : 'Login' }
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}


export default Nav;