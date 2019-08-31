import axios from 'axios';
import { UPDATE_ORDER } from '../constants';


const _updateOrder = order => ({
    type: UPDATE_ORDER,
    orders: order
})
export const updateOrder = (auth, history, params) => {
    const { username } = auth;
    const { recipientAddress, chargeAmount } = params;
    const amount = chargeAmount;

    const token = window.localStorage.getItem('token');

    return dispatch => (
        axios.post('https://vast-plains-55545.herokuapp.com/api/transaction', 
            { username, recipientAddress, amount }, 
            { headers: { authorization: token } }
        )
            .then(res => res.data.data)
            .then(data => {
                history.push(`/account/completed`);
                dispatch(_updateOrder(data));
            })
    )
}