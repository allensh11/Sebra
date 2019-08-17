import React from 'react';
import './Homepage.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));


const Homepage = ({ history }) => {
  const classes = useStyles();
  return (
    <div className="Homepage">
      <Button onClick={ () => history.push('/create-account') } variant="contained" color="primary" className={classes.button}>
          Pay with Libra
      </Button>
    </div>
  )
}


export default Homepage;