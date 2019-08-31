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

export const logout = (history, recipientAddress, chargeAmount) => (
    dispatch => {
        axios.post('https://vast-plains-55545.herokuapp.com/api/logout')
            .then(res => res.data.data)
            .then(data => {
                console.log(data)
                recipientAddress && chargeAmount 
                    ? history.push(`/login/${recipientAddress}/${chargeAmount}`) 
                    : history.push('/login')
                dispatch(_removeAuth({}))
            })
    }
)

export const login = (state, params, history) => {
    const { username, password, type } = state;
    const { recipientAddress } = params;
    const chargeAmount = Number(params.chargeAmount);
    //axios.defaults.withCredentials = true;
    return dispatch => (
        type === 'customer'
            ? ( axios.post('https://vast-plains-55545.herokuapp.com/api/login', { username, password, credentials: 'same-origin',})
                    .then(res => res.data.data)
                    /* fetch('https://vast-plains-55545.herokuapp.com/api/login', {
                        method: 'POST',
                        body: JSON.stringify({
                            username, password
                        }),
                        credentials: 'same-origin',   // this line has been added
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                    })
                    .then(response => { console.log(response); return response}) */
                    .then(data => {
                        if(recipientAddress && chargeAmount) { 
                            history.push(`/account/${recipientAddress}/${chargeAmount}`);
                        }
                        else history.push('/account');
                        dispatch(_setCustomerAuth(data));
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