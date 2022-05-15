import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'

import userReducer from './reducers/user'

const rootReducer = combineReducers({
    userReducer
});

const store = createStore(rootReducer, composeWithDevTools());

export default store