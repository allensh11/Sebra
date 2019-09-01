import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import ErrorSnackbar from './ErrorSnackbar';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1.5%'
  },
  paperContainer: { 
    padding: theme.spacing(3, 2),
    [theme.breakpoints.down('1080')]: {
      height: '394px',
      marginTop: '-4px'
    }  
  },
  headerContainer: {
    width: '100%',
    maxWidth: 500,
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
      margin: '40px 0px',
      fontSize: '22px'
    }
  },
  balanceContainer: {
    width: '50%',
    height: '225px',
    margin: 'auto',
  },  
  balance: {
    display: 'inline-block',
    fontSize: '75px',
    lineHeight: '225px',
    textAlign: 'center',
    paddingTop: '7px',
    [theme.breakpoints.down('1080')]: { 
      fontSize: '50px',
      lineHeight: '125px'
    }
  },
  emojiContainer: {
    width: '50px',
    height: '225px',
    margin: 'auto'
  },  
  emoji: {
    display: 'inline-block',
    fontSize: '75px',
    lineHeight: '225px',
    textAlign: 'center',
    paddingTop: '7px',
    [theme.breakpoints.down('1080')]: { lineHeight: '170px' }
  },
  button: {
    textAlign: 'right',
    marginTop: '41px',
    marginLeft: '67%',
    fontSize: '19px',
    padding: '15px 35px',
    [theme.breakpoints.down('1080')]: { 
      padding: '10px 20px',
      fontSize: '17px',
      marginTop: '-22px',
      textAlign: 'right',
      marginLeft: '70%'
    }
  },
}));


const Account = ({ pathname, params, history }) => {
  const classes = useStyles();
  const auth = useSelector(store => store.auth);
  pathname = pathname.slice(8);
  
  return (
    <div className={classes.mainContainer}>
      <Paper className={classes.paperContainer}>
        <div className={classes.headerContainer}>
            <Typography className={classes.header1} variant="h2" align="left">
              { pathname !== '/completed' ? 'Pay with Libra.' : 'Paid with Libra!' }
            </Typography>
            <Typography variant="h5" align="left" className={classes.header2}>Your account.</Typography>
        </div>
        {
          pathname !== '/completed' 
            ? (
              <Fragment>
                <div className={classes.balanceContainer}>
                  <Typography className={classes.balance} variant="h2">
                    { auth.accountBalance ? '≋' + auth.accountBalance : '≋' }
                  </Typography>
                </div>
                <ErrorSnackbar history={ history } params={ params }/>
              </Fragment>
            )
            : (
              <Fragment>
                <div className={classes.emojiContainer}>
                  <span className={classes.emoji} role="img" aria-label="party-popper">🎉</span>
                </div>
                <Button onClick={ () => history.push('/account')} variant="contained" color="primary" className={classes.button}>Done</Button>
              </Fragment>
            )
        }    
      </Paper>
    </div>
  );
}


export default Account;