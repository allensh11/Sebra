import { SET_CUSTOMER_AUTH, SET_BUSINESS_AUTH, REMOVE_AUTH } from '../constants';
import axios from 'axios';


const _setCustomerAuth = auth => ({
    type: SET_CUSTOMER_AUTH,
    auth
})
const _setBusinessAuth = auth => ({
    type: SET_BUSINESS_AUTH,
    auth
})
const _removeAuth = auth => ({
    type: REMOVE_AUTH,
    auth
})

export const logout = history => (
    dispatch => {
        axios.post('https://vast-plains-55545.herokuapp.com/api/logout')
            .then(res => res.data.data)
            .then(data => {
                console.log(data)
                history.push('/login');
                dispatch(_removeAuth({}))
            })
    }
)

export const login = (state, params, history) => {
    const { username, password, type } = state;
    const { recipientAddress } = params;
    const chargeAmount = Number(params.chargeAmount);

    return dispatch => (
        type === 'customer' 
        ? ( axios.post('https://vast-plains-55545.herokuapp.com/api/login', { username, password })
                .then(res => res.data.data)
                .then(data => {
                    history.push('/account');

                    if(recipientAddress && chargeAmount) { 
                        dispatch(_setCustomerAuth({ ...data, recipientAddress, chargeAmount }));
                    }
                    else dispatch(_setCustomerAuth(data));
                })
        )
        : ( axios.post('https://vast-plains-55545.herokuapp.com/api/businessLogin', { username, password })
                .then(res => res.data.data)
                .then(data => {
                    history.push('/dashboard');
                    dispatch(_setBusinessAuth(data));
                })
        )
    )
}