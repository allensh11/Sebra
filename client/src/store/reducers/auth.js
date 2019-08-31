import { SET_AUTH, REMOVE_AUTH } from '../constants';


const authReducer = (state = {}, action) => {
    switch(action.type) {
        case SET_AUTH: 
            return action.auth;
        case REMOVE_AUTH:
            return action.auth;
        default:
            return state;
    }
}


export default authReducer;