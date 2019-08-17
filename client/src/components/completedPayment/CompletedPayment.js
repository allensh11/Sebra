import React from 'react';
import { Link } from 'react-router-dom';
import './CompletedPayment.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: 'white'
    },
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
}));

const CompletedPayment = ({ customerId, history }) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <header className="Account-header">
                <Link>Paid with Lebra.</Link>
                <h3>Your account.</h3>
            </header>
            <div className='Account'>
                <div className='Emoji'>
                    <span role="img" aria-label="party-popper">🎉</span>
                </div>
                <Button variant="contained" color="primary" className={classes.button}>Done</Button>
            </div>
        </div>
    )
}


export default CompletedPayment;