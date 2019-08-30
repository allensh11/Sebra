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

export const login = (credentials, history) => (
    dispatch => {
        /* const auth = {
            id: 123,
            balance: 5
        }
        history.push(`/account/${auth.id}`);
        dispatch(_setAuth(auth)); */
        
        credentials = { username: 'allen2', recipientAddress: '4f518290107c5420bc80bb314783469e1d863c4dcea576334def709b03a8557b', amount: 1 }
        console.log(credentials)
        axios.post('https://vast-plains-55545.herokuapp.com/api/transaction', credentials)
            .then(res => res.data)
            .then(data => {
                console.log(data)
                //dispatch(_setAuth(auth));
            })
            .catch(err => console.log(err))
    }
)