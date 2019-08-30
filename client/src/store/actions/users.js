import axios from "axios";
import { CREATE_USER } from '../constants';


export const _createUser = user => ({
    type: CREATE_USER,
    user
})

export const createUser = (state, history) => (
    dispatch => {
        const { username, password, type } = state;

        type === 'customer' 
        ? ( axios.post('https://vast-plains-55545.herokuapp.com/api/register', { username, password })
                .then(res => res.data)
                .then(data => {
                    console.log(data, 'customer')
                    history.push('/login');
                    dispatch(_createUser(data.data));
                })
        )
        : ( axios.post('https://vast-plains-55545.herokuapp.com/api/businessRegister', { username, password })
                .then(res => res.data)
                .then(data => {
                    console.log(data, 'business')
                    history.push('/login');
                    dispatch(_createUser(data.data));
                })
        )
    }
)