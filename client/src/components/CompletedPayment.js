import React from 'react';
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
  },
  headerContainer: {
    width: '100%',
    maxWidth: 500,
    margin: '40px 0px',
  },
  header2: {
    margin: '65px 0px',
    fontWeight: 250
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

const CompletedPayment = ({ customerId, history }) => {
    const classes = useStyles();
    return (
        <div className={classes.mainContainer}>
            <Paper className={classes.paperContainer}>
                <div className={classes.headerContainer}>
                    <Typography variant="h2" align="left">Paid with Lebra!</Typography>
                    <Typography variant="h5" align="left" className={classes.header2}>Your account.</Typography>
                </div>
                <div className={classes.emojiContainer}>
                    <span className={classes.emoji} role="img" aria-label="party-popper">🎉</span>
                </div>
                <Button onClick={ () => history.push('/account/123')} variant="contained" color="primary" className={classes.button}>Done</Button>
            </Paper>
        </div>
    )
}


export default CompletedPayment;