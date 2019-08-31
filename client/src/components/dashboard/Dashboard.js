import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Snippet from './Snippet';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'white',
    marginTop: '8px',
  },
  leftContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1%',
    width: '50%',
  },
  paperLeftContainer: { 
    padding: theme.spacing(3, 3),
    height: '325px',
    marginTop: '70px',
    [theme.breakpoints.down('1080')]: {
      height: '350px',
      marginTop: '13px'
    }  
  },
  headerContainer: {
    width: '100%',
    /* maxWidth: 500, */
    margin: '40px 0px',
    [theme.breakpoints.down('1080')]: { margin: '0px' }  
  },
  header1: {
    [theme.breakpoints.down('1080')]: { fontSize: '45px' }  
  },
  header2: {
    margin: '65px 0px',
    fontWeight: 250,
    [theme.breakpoints.down('1080')]: { 
      margin: '30px 0px 110px',
      fontSize: '22px'
    }
  },
  balanceContainer: { textAlign: 'right' },
  balance: { [theme.breakpoints.down('1080')]: { fontSize: '40px' } },
  rightContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 'auto',
    width: '50%',
    [theme.breakpoints.down('1080')]: { marginRight: '40px' } 
  },
  paperRightContainer: {
    padding: theme.spacing(3, 3),
    backgroundColor: 'rgba(250,250,250)',
    height: '230px',
    marginTop: '100px',
    [theme.breakpoints.down('1080')]: {
      height: '180px',
      width: '380px',
      marginTop: '-4px'
    }  
  },
  margin: { margin: theme.spacing(1) },
  textField: {
    /* flexBasis: 200, */
    width: '367px',
  },
  error: { 
    margin: '-1px 0px 10px 8px',
    [theme.breakpoints.down('1080')]: { margin: '-1px 0px 0px 8px',}  
  }
}));


const Dashboard = ({ history }) => {
  const classes = useStyles();
  const auth = useSelector(store => store.auth);

  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleChange = () => e => {
    setAmount(e.target.value);
    isNaN(Number(e.target.value)) ? setError('Not a valid amount.') : setError('');
  }

  return (
    <Grid container className={classes.root}>
      <Grid item xs className={classes.leftContainer}>
        <Paper className={classes.paperLeftContainer}>
            <div className={classes.headerContainer}>
                <Typography variant="h2" align="left" className={classes.header1}>{ auth.name }</Typography>
                <Typography variant="h5" align="left" className={classes.header2}>Your account balance.</Typography>
            </div>
            <div className={classes.balanceContainer}>
              <Typography className={classes.balance} variant="h2">{ '≋' + auth.accountBalance }</Typography>
            </div>
        </Paper>
      </Grid>
      <Grid item xs className={classes.rightContainer}>
        <Paper className={classes.paperRightContainer}>
          <FormControl className={classes.formControl} error>
            <TextField
              id="amount"
              className={clsx(classes.margin, classes.textField)}
              variant="filled"
              placeholder="Enter amount for Snippet"
              value={amount}
              onChange={handleChange()}
              InputProps={{ startAdornment: <InputAdornment position="start">≋</InputAdornment> }}
            />
            {
              error 
                ? <FormHelperText className={classes.error}>{error}</FormHelperText>  
                : null
            }
            <Snippet auth={ auth } amount={ amount } error={ error }/>
          </FormControl>
        </Paper>
      </Grid>
    </Grid>
  );
}


export default Dashboard;