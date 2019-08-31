/* import React, { Fragment } from 'react';
import { calcLineItemCost, calcSubtotal, calcTaxes, calcTotal } from '../util';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'white',
    marginTop: '8px',
    [theme.breakpoints.down('1125')]: {
      flexDirection: 'column'
    },
  },
  leftContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1%',
    width: '50%',
    [theme.breakpoints.down('1125')]: { margin: '1% auto 2%' }
  },
  paperLeftContainer: {
    padding: theme.spacing(3, 3),
    [theme.breakpoints.down('1125')]: {
      minWidth: '163%',
      padding: theme.spacing(3, 4),
    },
  },
  headerContainer: {
    width: '100%',
    margin: '40px 0px',
    [theme.breakpoints.down('1125')]: { margin: '0' }
  },
  header2: {
    margin: '65px 0px',
    fontWeight: 250,
    [theme.breakpoints.down('1125')]: { margin: '25px 0px' }
  },
  balanceContainer: {
    width: '50px',
    height: '225px',
    margin: 'auto',
    [theme.breakpoints.down('1125')]: { height: '140px' }
  },  
  balance: {
    display: 'inline-block',
    fontSize: '75px',
    lineHeight: '225px',
    textAlign: 'center',
    paddingTop: '7px',
    [theme.breakpoints.down('1125')]: {
      fontSize: '65px',
      lineHeight: '140px',
    },
  },
  rightContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    margin: 'auto',
    width: '50%',
    [theme.breakpoints.down('1125')]: {
      padding: '7px 0px 7px 18px',
      marginLeft: '0',
      marginRight: 'auto',
    },
  },
  paperRightContainer: {
    padding: theme.spacing(3, 3),
    backgroundColor: 'rgba(250,250,250)',
    [theme.breakpoints.down('1125')]: { minWidth: '190%' },
    [theme.breakpoints.down('700')]: {
      padding: theme.spacing(1, 1),
      minWidth: '190%',
    },
  },
  cartItem: { margin: theme.spacing(1, 2) },
  totalsContainer: { paddingTop: '100px' },
  totalsItem: { margin: theme.spacing(0.25, 2) }
}));

const cart = [
    { 
        id: 1,
        itemName: 'Tech Backpack', 
        unitPrice: 65.00,
        description: 'Reverse Denim',
        quantity: 1
    },
    {
      id: 2,
      itemName: 'Stupid Expensive Scarf', 
      unitPrice: 35.00,
      description: 'Black',
      quantity: 2
    },
    {
      id: 3,
      itemName: 'The Twill Zip Tote', 
      unitPrice: 85.00,
      description: 'Black Leather',
      quantity: 1
    }
]
const shippingCost = 3.00;
const taxRate = 0.0875;
  
const subtotal = calcSubtotal(cart);
const taxes = calcTaxes(subtotal, shippingCost, taxRate);


const Cart = () => {
    const classes = useStyles();
    return (
        <Grid item xs className={classes.rightContainer}>
        <Paper className={classes.paperRightContainer}>
          <div className={classes.cartItemsContainer}>
          {
            cart.map(cartItem => (
              <Fragment key={ cartItem.id }>
                <div className={classes.cartItem}>
                  <Grid container alignItems="center">
                    <Grid item xs>
                      <Typography gutterBottom variant="h5">
                        { cartItem.itemName }
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography gutterBottom variant="h6">
                        { '$ ' + calcLineItemCost(cartItem.unitPrice, cartItem.quantity) }
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography color="textSecondary" variant="body2">
                    { cartItem.description }
                    <br/>
                    { 'Quantity: ' + cartItem.quantity }
                  </Typography>
                </div>
                <Divider variant="middle" />
              </Fragment>
            ))
          }
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
                    { '$' + subtotal }
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
                    { '$' + shippingCost.toFixed(2) }
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
                    { '$' + taxes }
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
                    { '$' + calcTotal(subtotal, shippingCost, taxes) }
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </div>
        </Paper>
      </Grid>
    )
}


export default Cart; */