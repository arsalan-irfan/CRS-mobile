import { Add_Product, Remove_Product, Inc_Quantity, Dec_Quantity, Empty_Cart } from "../actions/actionTypes"

const initialState = {
    products: [],
    totalPrice: 0
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case Add_Product:
            let temp = state.products;
            temp.push(payload);
            return {
                ...state,
                products: temp,
                totalPrice: state.totalPrice + payload.price
            }
        case Remove_Product:
            let temp1 = state.products.filter(prod => prod.id !== payload.id);
            return {
                ...state,
                products: temp1,
                totalPrice: state.totalPrice + payload.price
            }
        case Inc_Quantity:
            let index = state.products.findIndex(prod => prod.id === payload.price);
            let temp2 = state.products
            temp2[index].quantity += 1

            return {
                ...state,
                products: temp2,
                totalPrice: state.totalPrice + payload.price
            }
        case Dec_Quantity:
            let index1 = state.products.findIndex(prod => prod.id === payload.price);
            let temp3 = state.products
            temp3[index1].quantity -= 1

            return {
                ...state,
                products: temp3,
                totalPrice: state.totalPrice - payload.price
            }
        case Empty_Cart:
            return {
                ...state,
                totalPrice: 0,
                products: []
            };
        default:
            return state;
    }
}
