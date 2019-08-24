import { LOAD_INITIAL_USERS, CREATE_USER, UPDATE_USER } from '../constants';


/* const usersReducer = (state = [], action) => {
    switch(action.type) {
        case LOAD_INITIAL_USERS:
            return action.users;
        case CREATE_USER:
            return [...state, action.user];
        case UPDATE_USER:
            return state.map(user => user.id !== action.user.id ? user : action.user);
        default:
            return state;
    }
}


export default usersReducer; */