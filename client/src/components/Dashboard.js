import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import Snippet from './Snippet';


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
  },
  headerContainer: {
    width: '100%',
    /* maxWidth: 500, */
    margin: '40px 0px',
  },
  header2: {
    margin: '65px 0px',
    fontWeight: 250,
  },
  rightContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 'auto',
    width: '50%',
  },
  paperRightContainer: {
    padding: theme.spacing(3, 3),
    backgroundColor: 'rgba(250,250,250)',
  },
}));


const Dashboard = ({ history }) => {

  const classes = useStyles();

  const auth = useSelector(store => store.auth);

  return (
    <Grid container className={classes.root}>
      <Grid item xs className={classes.leftContainer}>
        <Paper className={classes.paperLeftContainer}>
            <div className={classes.headerContainer}>
                <Typography variant="h2" align="left">{ auth.name }</Typography>
                <Typography variant="h5" align="left" className={classes.header2}>Your account balance.</Typography>
            </div>
            <div className={classes.balanceContainer}>
              <Typography className={classes.balance} variant="h2">{ '$' + auth.balance }</Typography>
            </div>
        </Paper>
      </Grid>
      <Grid item xs className={classes.rightContainer}>
        <Paper className={classes.paperRightContainer}>
            {/* <Button variant="contained" color="primary" className={classes.button}>
                Generate JS Snippet
            </Button> */}
            <Snippet auth={ auth }/>
        </Paper>
      </Grid>
    </Grid>
  );
}


export default Dashboard;