//import axios from 'axios';
import { UPDATE_ORDER } from '../constants';


const _updateOrder = cart => ({
    type: UPDATE_ORDER,
    orders: cart
})
export const updateOrder = (cart, auth, history) => (
    dispatch => {
        //state = { username: 'allen2', recipientAddress: '4f518290107c5420bc80bb314783469e1d863c4dcea576334def709b03a8557b', amount: 1 }
        history.push(`/account/${auth.id}/completed`);
        dispatch(_updateOrder(cart));
    }
)