import { UPDATE_ORDER } from '../constants';


const ordersReducer = (state = [], action) => {
    switch(action.type) {
        case UPDATE_ORDER:
            return [ ...state, action.orders ];
        default:
            return state;
    }
}

export default ordersReducer;