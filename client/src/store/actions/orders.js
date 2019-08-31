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
            recipientAddress: /* auth.recipientAddress, */'fb6afdfa245979b6373268489ae0d7011f4e7e5e72428835bd31cd0bd976d007', 
            amount: auth.chargeAmount 
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