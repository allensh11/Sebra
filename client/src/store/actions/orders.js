//import axios from 'axios';
import { UPDATE_ORDER } from '../constants';


const _updateOrder = cart => ({
    type: UPDATE_ORDER,
    orders: cart
})
export const updateOrder = (cart, auth, history) => (
    dispatch => {
        history.push(`/account/${auth.id}/completed`);
        dispatch(_updateOrder(cart));
    }
)