
import { Fetch_General_Data_Failed,Fetch_General_Data_Success} from './actionTypes'
import axios from "axios"
import {apiDomain} from '../config'


export const getCountries = () => async dispatch => {
    try {
        const response= await fetch(`${apiDomain}/api/GenCountry`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          });

        const res = await response.json();
        // const res = await Promise.all[
        //     axios.get(`${apiDomain}/GenCountry`),
        //     axios.get(`${apiDomain}/GenStates`),
        //     axios.get(`${apiDomain}/GenCities`)
        // ]
        console.log(res)
        dispatch({
            type: Fetch_General_Data_Success,
            payload: {countries:[],states:[],cities:[]}
        })
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: Fetch_General_Data_Failed,
        })        
    }
    

}
