import { SET_AUTH } from '../constants';
import axios from 'axios';


const _setAuth = auth => ({
    type: SET_AUTH,
    auth
})

export const logout = history => {
    history.push('/login');
    return _setAuth({});
}

export const login = (state, history) => (
    dispatch => {
        const { username, password, type } = state;

        type === 'customer' 
        ? ( axios.post('https://vast-plains-55545.herokuapp.com/api/login', { username, password })
                .then(res => res.data)
                .then(data => {
                    history.push('/account');
                    dispatch(_setAuth(data.data));
                })
        )
        : ( axios.post('https://vast-plains-55545.herokuapp.com/api/businessLogin', { username, password })
                .then(res => res.data)
                .then(data => {
                    history.push('/dashboard');
                    dispatch(_setAuth(data.data));
                })
        )
    }
)