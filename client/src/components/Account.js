import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  leftContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1%',
    width: '50%'
  },
  paperLeftContainer: {
    padding: theme.spacing(3, 3),
  },
  rightContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    margin: 'auto',
    width: '50%'
  },
  paperRightContainer: {
    padding: theme.spacing(3, 3),
    backgroundColor: 'rgba(250,250,250)'
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
  balanceContainer: {
    width: '50px',
    height: '225px',
    margin: 'auto'
  },  
  balance: {
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
  cartItem: {
    margin: theme.spacing(1, 2),
  },
  totalsContainer: {
    paddingTop: '100px',
  },
  totalsItem: {
    margin: theme.spacing(0.25, 2),
  }
}));



const Account = ({ customerId, history }) => {

  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2} >
      <Grid item xs={5} className={classes.leftContainer}>
        <Paper className={classes.paperLeftContainer}>
            <div className={classes.headerContainer}>
                <Typography variant="h2" align="left">Pay with Lebra.</Typography>
                <Typography variant="h5" align="left" className={classes.header2}>Your account.</Typography>
            </div>
            <div className={classes.balanceContainer}>
              <Typography className={classes.balance} variant="h2">$5</Typography>
            </div>
            <Button onClick={ () => history.push(`/account/${customerId}/completed`) } variant="contained" color="primary" className={classes.button}>
              Pay
            </Button>
        </Paper>
      </Grid>
      <Grid item xs={7} className={classes.rightContainer}>
        <Paper className={classes.paperRightContainer}>
          <div className={classes.cartItemsContainer}>
            <div className={classes.cartItem}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h5">
                    Tech Backpack
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant="h6">
                    $65.00
                  </Typography>
                </Grid>
              </Grid>
              <Typography color="textSecondary" variant="body2">
                Reverse Denim
                <br/>
                Quanity: 1
              </Typography>
            </div>
            <Divider variant="middle" />
            <div className={classes.cartItem}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h5">
                    Stupid Expensive Scarf
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant="h6">
                    $95.00
                  </Typography>
                </Grid>
              </Grid>
              <Typography color="textSecondary" variant="body2">
                Black
                <br/>
                Quanity: 2
              </Typography>
            </div>
            <Divider variant="middle" />
            <div className={classes.cartItem}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h5">
                    The Twill Zip Tote
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant="h6">
                    $85.00
                  </Typography>
                </Grid>
              </Grid>
              <Typography color="textSecondary" variant="body2">
                Black Leather
                <br/>
                Quanity: 1
              </Typography>
            </div>
            <Divider variant="middle" />
          </div>
          <div className={classes.totalsContainer}>
            <div className={classes.totalsItem}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom color="textSecondary" variant="h6">
                    Subtotal:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography gutterBottom color="textSecondary" variant="h6">
                    $398.00
                  </Typography>
                </Grid>
              </Grid>
            </div>
            <div className={classes.totalsItem}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom color="textSecondary" variant="h6">
                    Shipping:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography gutterBottom color="textSecondary" variant="h6">
                    Free
                  </Typography>
                </Grid>
              </Grid>
            </div>
            <div className={classes.totalsItem}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom color="textSecondary" variant="h6">
                    Taxes:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography gutterBottom color="textSecondary" variant="h6">
                    $12.12
                  </Typography>
                </Grid>
              </Grid>
            </div>
            <Divider variant="middle" />
            <div className={classes.totalsItem}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h5">
                    Total:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant="h6">
                    $410.12
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}


export default Account;