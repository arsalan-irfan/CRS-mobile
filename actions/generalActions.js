
import { Fetch_General_Data_Failed, Fetch_General_Data_Success } from './actionTypes'
import axios from "axios"
import { apiDomain } from '../config'


export const getCountries = () => async dispatch => {
    try {
        console.log("Here");
        const countries = await axios.get(`${apiDomain}/GenCountry`)
        const states = await axios.get(`${apiDomain}/GenStates`)
        const cities = await axios.get(`${apiDomain}/GenCities`)
        dispatch({
            type: Fetch_General_Data_Success,
            payload: { countries: countries.data, states: states.data, cities: cities.data }
        })
        
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: Fetch_General_Data_Failed,
        })
    }


}
