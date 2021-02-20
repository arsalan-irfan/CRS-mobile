import { Show_Snackbar,Hide_Snackbar} from '../actions/actionTypes'


const initialState = {
    showSnackbar: false,
    snackbarMessage: "",
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case Hide_Snackbar:
            return {
                ...state,
                showSnackbar: false,
                sellerMessage: ""
            }        
        case Show_Snackbar:
            return {
                ...state,
                showSnackbar: true,
                snackbarMessage: payload
            }     
        default:
            return state;
    }
}