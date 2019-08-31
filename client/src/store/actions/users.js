import axios from "axios";
import { CREATE_CUSTOMER_USER, CREATE_BUSINESS_USER } from '../constants';


export const _createCustomerUser = user => ({
    type: CREATE_CUSTOMER_USER,
    user
})
export const _createBusinessUser = user => ({
    type: CREATE_BUSINESS_USER,
    user
})

export const createUser = state => {
    const { username, password, type } = state;

    return dispatch => (
        type === 'customer' 
        ? ( axios.post('https://vast-plains-55545.herokuapp.com/api/register', { username, password })
                .then(res => res.data.data)
                .then(data => dispatch(_createCustomerUser(data)))
        )
        : ( axios.post('https://vast-plains-55545.herokuapp.com/api/businessRegister', { username, password })
                .then(res => res.data.data)
                .then(data => dispatch(_createBusinessUser(data)))
        )
    )
}