import { SET_AUTH, REMOVE_AUTH } from '../constants';
import axios from 'axios';


const _setAuth = auth => ({
    type: SET_AUTH,
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

export const login = (state, params, history) => (
    dispatch => {
        const { username, password, type } = state;

        type === 'customer' 
        ? ( axios.post('https://vast-plains-55545.herokuapp.com/api/login', { username, password })
                .then(res => res.data.data)
                .then(data => {
                    history.push('/account');
                    const { recipientAddress } = params;
                    const chargeAmount = Number(params.chargeAmount);

                    if(recipientAddress && chargeAmount) { 
                        dispatch(_setAuth({ ...data, recipientAddress, chargeAmount }));
                    }
                    else dispatch(_setAuth(data));
                })
        )
        : ( axios.post('https://vast-plains-55545.herokuapp.com/api/businessLogin', { username, password })
                .then(res => res.data.data)
                .then(data => {
                    history.push('/dashboard');
                    dispatch(_setAuth(data));
                })
        )
    }
)