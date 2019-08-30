import axios from 'axios';
import { UPDATE_ORDER } from '../constants';


const _updateOrder = cart => ({
    type: UPDATE_ORDER,
    orders: cart
})
export const updateOrder = (cart, auth, history) => (
    dispatch => {   
        const transactionInfo = { 
            username: auth.username, 
            recipientAddress: '4f518290107c5420bc80bb314783469e1d863c4dcea576334def709b03a8557b', 
            amount: 1 
        }     
        console.log(transactionInfo)
        axios.post('https://vast-plains-55545.herokuapp.com/api/transaction', transactionInfo)
            .then(res => res.data)
            .then(data => {
                console.log(data)
                history.push(`/account/completed`);
                dispatch(_updateOrder(cart));
            })
    }
)