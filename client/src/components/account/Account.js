import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './Account.css';
import { Button } from 'reactstrap';


const Account = ({ customerId, history }) => (
    <Fragment>
        <header className="Account-header">
            <Link>Pay with Lebra.</Link>
            <h3>Your account.</h3>
        </header>
        <Button onClick={ () => history.push(`/account/${customerId}/completed`) } color='primary'>Pay</Button>
    </Fragment>
)


export default Account;