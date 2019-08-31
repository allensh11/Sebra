import axios from 'axios';
import { UPDATE_ORDER } from '../constants';


const _updateOrder = order => ({
    type: UPDATE_ORDER,
    orders: order
})
export const updateOrder = (auth, history) => {
    const token = window.localStorage.getItem('token');
    console.log(token)
    const transactionInfo = { 
        username: /* auth.username, */ 'allen2',
        recipientAddress: /* auth.recipientAddress, */'4f518290107c5420bc80bb314783469e1d863c4dcea576334def709b03a8557b', 
        amount: /* auth.chargeAmount / 100 */ 5
    }     
    console.log(transactionInfo)
    return dispatch => (
        axios.post('https://vast-plains-55545.herokuapp.com/api/transaction', 
            { 
                username: 'allen2',
                recipientAddress: '4f518290107c5420bc80bb314783469e1d863c4dcea576334def709b03a8557b', 
                amount: 5 
            }, 
            { headers: { authorization: token } }
        )
            .then(res => res.data.data)
            .then(data => {
                history.push(`/account/completed`);
                dispatch(_updateOrder(data));
            })
            .catch(err => console.log(err))
    )
}