import axios from 'axios';
import { UPDATE_ORDER } from '../constants';


const _updateOrder = cart => ({
    type: UPDATE_ORDER,
    orders: cart
})
export const updateOrder = (auth, history) => {
    const transactionInfo = { 
        username: /* auth.username, */ 'allen2',
        recipientAddress: /* auth.recipientAddress, */'5ab2729c2e8f0f05e6408abaf4284ba13add04937585a66e7a5dd2812327e8f1', 
        amount: /* auth.chargeAmount / 100 */ 5
    }     
    console.log(transactionInfo)
    return dispatch => (
        axios.post('https://vast-plains-55545.herokuapp.com/api/transaction', transactionInfo)
            .then(res => res.data)
            .then(data => {
                history.push(`/account/completed`);
                dispatch(_updateOrder(data));
            })
    )
}