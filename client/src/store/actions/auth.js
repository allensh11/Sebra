import { SET_CUSTOMER_AUTH, SET_BUSINESS_AUTH, REMOVE_AUTH } from '../constants';
import axios from 'axios';


export const exchangeTokenForAuth = (params = {}, history) => (
    dispatch => {
        const { recipientAddress } = params;
        const chargeAmount = Number(params.chargeAmount);

        const token = window.localStorage.getItem('token');

        if(!token) return;
        return axios.get('https://vast-plains-55545.herokuapp.com/api/auth', { headers: { authorization: token } })
            .then(res => res.data.data)
            .then(auth => {
                if(auth.type === 'customer') { 
                    dispatch(_setCustomerAuth(auth));
                    if(history) {
                        if(recipientAddress && chargeAmount) {
                            history.push(`/account/${recipientAddress}/${chargeAmount}`);
                        }
                        else history.push('/account');
                    }
                }
                else {
                    dispatch(_setBusinessAuth(auth));
                    if(history) history.push('/dashboard'); 
                }   
            }) 
            .catch(ex => window.localStorage.removeItem('token'))
    }
)

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

export const logout = (history, recipientAddress, chargeAmount) => {
    window.localStorage.removeItem('token');
    recipientAddress && chargeAmount 
        ? history.push(`/login/${recipientAddress}/${chargeAmount}`) 
        : history.push('/login')
    return _removeAuth({});
 }

export const login = (state, params, history) => {
    const { username, password } = state;
    
    return dispatch => (
        axios.post('https://vast-plains-55545.herokuapp.com/api/auth', { username, password })
            .then(res => res.data.data)
            .then(data => {
                window.localStorage.setItem('token', data.token);
                dispatch(exchangeTokenForAuth(params, history));
            })
    )
}