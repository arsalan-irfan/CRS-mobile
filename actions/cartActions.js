import { Add_Product, Remove_Product, Empty_Cart, Inc_Quantity, Dec_Quantity, } from './actionTypes';


export const addProduct = (product) => dispatch => {
    dispatch({
        type: Add_Product,
        payload: product
    })
}

export const removeProduct = (product) => dispatch => {
    dispatch({
        type: Remove_Product,
        payload: product
    })
}

export const incQuantity = (product) => dispatch => {
    dispatch({
        type: Inc_Quantity,
        payload: product
    })
}

export const decQuantity = (product) => dispatch => {
    dispatch({
        type: Dec_Quantity,
        payload: product
    })
}
export const emptyCart = () => dispatch => {
    dispatch({
        type: Empty_Cart,
    })
}