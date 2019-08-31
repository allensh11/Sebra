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
  paperContainer: { padding: theme.spacing(3, 2) },
  headerContainer: {
    width: '100%',
    maxWidth: 500,
    margin: '40px 0px',
  },
  header2: {
    margin: '65px 0px',
    fontWeight: 250
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
    paddingTop: '7px'
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
    paddingTop: '7px'
  },
  button: {
    textAlign: 'right',
    marginTop: '41px',
    marginLeft: '69%',
    fontSize: '19px',
    padding: '20px 40px'
  },
}));


const Account = ({ pathname, history }) => {
  const classes = useStyles();
  const auth = useSelector(store => store.auth);
  pathname = pathname.slice(8);
  
  return (
    <div className={classes.mainContainer}>
      <Paper className={classes.paperContainer}>
        <div className={classes.headerContainer}>
            <Typography variant="h2" align="left">
              { pathname !== '/completed' ? 'Pay with Lebra.' : 'Paid with Lebra!' }
            </Typography>
            <Typography variant="h5" align="left" className={classes.header2}>Your account.</Typography>
        </div>
        {
          pathname !== '/completed' 
            ? (
              <Fragment>
                <div className={classes.balanceContainer}>
                  <Typography className={classes.balance} variant="h2">{ '$' + auth.accountBalance }</Typography>
                </div>
                <ErrorSnackbar history={ history }/>
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