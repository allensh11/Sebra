import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './CompletedPayment.css';
import { Button } from 'reactstrap';


const CompletedPayment = ({ customerId, history }) => (
    <Fragment>
        <header className="Account-header">
            <Link>Paid with Lebra.</Link>
            <h3>Your account.</h3>
        </header>
        <Button color="primary">Done</Button>
    </Fragment>
)


export default CompletedPayment;