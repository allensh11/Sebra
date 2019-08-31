import { CREATE_CUSTOMER_USER, CREATE_BUSINESS_USER } from '../constants';


const usersReducer = (state = [], action) => {
    switch(action.type) {
        case CREATE_CUSTOMER_USER:
            return [...state, action.user];
        case CREATE_BUSINESS_USER:
            return [...state, action.user];
        default:
            return state;
    }
}


export default usersReducer;