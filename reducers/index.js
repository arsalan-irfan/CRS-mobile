import { combineReducers } from "redux";
import authReducer from './authReducer'
import snackbarReducer from './snackbarReducer';
import generalReducer from './generalReducer';
import cartReducer from './cartReducer'



export default combineReducers({
    authReducer,
    snackbarReducer,
    generalReducer,
    cartReducer
});