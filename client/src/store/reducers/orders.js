import { UPDATE_ORDER } from '../constants';


const ordersReducer = (state = [], action) => {
    switch(action.type) {
        case UPDATE_ORDER:
            return action.orders
        default:
            return state;
    }
}

export default ordersReducer;