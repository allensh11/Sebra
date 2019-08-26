//import axios from "axios";
import { CREATE_USER } from '../constants';


export const _createUser = user => ({
    type: CREATE_USER,
    user
})
export const createUser = (user, history) => (
    dispatch => {
        const _user = {
            id: 456,
            balance: 15
        }
        history.push(`/account/${_user.id}`);
        dispatch(_createUser(_user));
    }
)