import { Show_Snackbar,Hide_Snackbar} from './actionTypes'

export const showSnackbar = (message) => dispatch => {
    dispatch({
        type: Show_Snackbar,
        payload: message
    })
}


export const hideSnackbar = () => dispatch => {
    dispatch({
        type: Hide_Snackbar,
    })
}

