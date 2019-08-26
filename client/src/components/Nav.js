import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


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

const auth = {
  id: 123,
  balance: 5
}

const Nav = ({ history }) => {
  const classes = useStyles();

  useEffect(() => auth.id ? history.push(`/account/${auth.id}`) : history.push('/login'), [history]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          <Link to='/' className={classes.link}>Sebra</Link>
          </Typography>
          <Button color="inherit">
            <Link to='/login' className={classes.link}>Login</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}


export default Nav;