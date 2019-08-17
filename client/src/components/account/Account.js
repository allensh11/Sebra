/* import React from 'react';
import { Link } from 'react-router-dom';
import './Account.css';
import { Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';


const Account = ({ customerId, history }) => (
    <div className="Account-container">
        
        <div className="Account-container-2">
            <ListGroup>
                <ListGroupItem>
                    <ListGroupItemHeading>Tech Backpack</ListGroupItemHeading>
                    <ListGroupItemText>Reverse Denim</ListGroupItemText>
                    <ListGroupItemText>Quanity: 1</ListGroupItemText>
                    <ListGroupItemText>$65</ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                    <ListGroupItemHeading>The Twill Zip Tote</ListGroupItemHeading>
                    <ListGroupItemText>Black Leather</ListGroupItemText>
                    <ListGroupItemText>Quanity: 1</ListGroupItemText>
                    <ListGroupItemText>$65</ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                    <ListGroupItemHeading>Stupid Expensive Scarf</ListGroupItemHeading>
                    <ListGroupItemText>Black</ListGroupItemText>
                    <ListGroupItemText>Quanity: 2</ListGroupItemText>
                    <ListGroupItemText>$65</ListGroupItemText>
                </ListGroupItem>
            </ListGroup>
            <ListGroup>
                <ListGroupItem>
                    <ListGroupItemText>Subtotal: $398</ListGroupItemText>
                    <ListGroupItemText>Shipping: Free</ListGroupItemText>
                    <ListGroupItemText>Taxes: $12.12</ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                    <ListGroupItemText>Total: $410.12</ListGroupItemText>
                </ListGroupItem>
            </ListGroup>
        </div>
    </div>
)


export default Account; */

import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'white'
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
  rootTable: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    backgroundColor: 'white'
  },
  table: {
    minWidth: 700,
  },
}));

const TAX_RATE = 0.07;

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }
  
  function priceRow(qty, unit) {
    return qty * unit;
  }
  
  function createRow(desc, qty, unit) {
    const price = priceRow(qty, unit);
    return { desc, qty, unit, price };
  }
  
  function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }
  
  const rows = [
    createRow('Paperclips (Box)', 100, 1.15),
    createRow('Paper (Case)', 10, 45.99),
    createRow('Waste Basket', 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;


const SpacingGrid = ({ customerId, history }) => {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  function handleChange(event, value) {
    setSpacing(Number(value));
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
            <Grid item>
                {/* <Paper className={classes.paper}> */}
                    <header className="Account-header">
                        <Link>Pay with Lebra.</Link>
                        <h3>Your account.</h3>
                    </header>
                    <div className='Account'>
                        <div className='Account-balance'>
                           <h2>$5</h2>
                        </div>
                        <Button onClick={ () => history.push(`/account/${customerId}/completed`) } variant="contained" color="primary" className={classes.button}>
                            Pay
                        </Button>
                    </div>
                {/* </Paper> */}
            </Grid>
            <Grid item>
                {/* <Paper className={classes.root}> */}
                <div className={classes.rootTable}>
                    <Table className={classes.table}>
                        <TableHead>
                        <TableRow>
                            <TableCell>Desc</TableCell>
                            <TableCell align="right">Qty.</TableCell>
                            <TableCell align="right">@</TableCell>
                            <TableCell align="right">Price</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.desc}>
                            <TableCell>{row.desc}</TableCell>
                            <TableCell align="right">{row.qty}</TableCell>
                            <TableCell align="right">{row.unit}</TableCell>
                            <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                            </TableRow>
                        ))}

                        <TableRow>
                            <TableCell rowSpan={3} />
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Tax</TableCell>
                            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                        </TableRow>
                        </TableBody>
                    </Table>
                </div>
                {/* </Paper> */}
            </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SpacingGrid;