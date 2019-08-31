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
  paperLeftContainer: { padding: theme.spacing(3, 3) },
  headerContainer: {
    width: '100%',
    /* maxWidth: 500, */
    margin: '40px 0px',
  },
  header2: {
    margin: '65px 0px',
    fontWeight: 250,
  },
  balanceContainer: { textAlign: 'right' },
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
  margin: { margin: theme.spacing(1) },
  textField: {
    flexBasis: 200,
    width: '414px',
  },
}));


const Dashboard = ({ history }) => {
  const classes = useStyles();
  const auth = useSelector(store => store.auth);

  const [amount, setAmount] = useState('');

  const handleChange = () => e => setAmount(e.target.value);

  return (
    <Grid container className={classes.root}>
      <Grid item xs className={classes.leftContainer}>
        <Paper className={classes.paperLeftContainer}>
            <div className={classes.headerContainer}>
                <Typography variant="h2" align="left">{ auth.name }</Typography>
                <Typography variant="h5" align="left" className={classes.header2}>Your account balance.</Typography>
            </div>
            <div className={classes.balanceContainer}>
              <Typography className={classes.balance} variant="h2">{ '≋' + auth.accountBalance }</Typography>
            </div>
        </Paper>
      </Grid>
      <Grid item xs className={classes.rightContainer}>
        <Paper className={classes.paperRightContainer}>
          <TextField
            id="amount"
            className={clsx(classes.margin, classes.textField)}
            variant="filled"
            placeholder="Enter amount for Snippet"
            value={amount}
            onChange={handleChange()}
            InputProps={{ startAdornment: <InputAdornment position="start">≋</InputAdornment> }}
          />
          <Snippet auth={ auth } amount={ amount }/>
        </Paper>
      </Grid>
    </Grid>
  );
}


export default Dashboard;