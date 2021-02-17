import { Fetch_General_Data_Success, Fetch_General_Data_Failed } from '../actions/actionTypes'


const initialState = {
    countries: [],
    cities: [],
    states: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case Fetch_General_Data_Failed:
            return state
        case Fetch_General_Data_Success:
            return {
                ...state,
                countries: payload.countries,
                cities: payload.cities,
                states: payload.states
            }
        default:
            return state;
    }
}