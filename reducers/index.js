import { combineReducers } from "redux";
import authReducer from './authReducer'
import snackbarReducer from './snackbarReducer';
import generalReducer from './generalReducer'
export default combineReducers({
    authReducer,
    snackbarReducer,
    generalReducer
});