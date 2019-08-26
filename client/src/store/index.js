import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import authReducer from './reducers/auth';
import usersReducer from './reducers/users';
import ordersReducer from './reducers/orders';


const reducer = combineReducers({
    auth: authReducer,
    users: usersReducer,
    orders: ordersReducer
})

const store = createStore(reducer, applyMiddleware(thunk, logger));


export default store;