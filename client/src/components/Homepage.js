import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  homepage: {
    margin: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  paperContainer: {
    padding: theme.spacing(15, 10),
  },
  button: {
    margin: theme.spacing(1),
    fontSize: '30px',
    padding: '20px 40px'
  },
  input: {
    display: 'none',
  },
}));


const Homepage = ({ history }) => {
  const classes = useStyles();
  return (
    <div className={classes.homepage}>
      <Paper className={classes.paperContainer}>
        <Button onClick={ () => history.push('/create-account') } variant="contained" color="primary" className={classes.button}>
            Pay with Libra
        </Button>
      </Paper>
    </div>
  )
}


export default Homepage;