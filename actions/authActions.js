import { User_Fetched_Failed, User_Fetched_Success, User_Login_Success, Create_User_Failed, Create_User_Success, User_Loading, User_Logout, Update_User_Success, Update_User_Failed, Updating_User,Set_User_Authenticated } from './actionTypes';
import { apiDomain } from '../config'
import { AsyncStorage } from 'react-native'
import axios from 'axios'
import { showSnackbar } from './snackbarActions'

export const toggleLoader = () => dispatch => {
    dispatch({
        type: User_Loading
    })
}

export const authenticateUser=()=>dispatch=>{
    dispatch({
        type:Set_User_Authenticated
    })
}

export const logoutUser = (navigation) => async dispatch => {
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem("id")
    // navigation.navigate("Login");
    
    dispatch({
        type: User_Logout
    })
}


export const loginUser = (data) => async dispatch => {
    try {
        dispatch(toggleLoader())
        let res = await axios.put(`${apiDomain}/Login`, data);
        console.log(res.data)
        if (res.data.token) {
            await AsyncStorage.setItem("token", res.data.token)
            await AsyncStorage.setItem("id", res.data.user.id.toString())
        }
        dispatch(toggleLoader())
        dispatch({
            type: User_Login_Success,
            payload: res.data.token
        })
        console.log(res.data)
        // dispatch(getAuthenticatedUser())

    } catch (error) {
        console.log("Error", error);
        if (error.response) {
            console.log("Error", error.response);
        }

        dispatch(toggleLoader())

        dispatch({
            type: Create_User_Failed
        })
        dispatch(showSnackbar("Invalid Email Password !"));

    }
}


export const createUser = (data,navigation) => async dispatch => {
    try {
        console.log("Here",data)
        dispatch(toggleLoader())
        let res = await axios.post(`${apiDomain}/User`, data);
        console.log("Success", res.data);
        // await AsyncStorage.setItem("token", res.data.token);
        
        dispatch(toggleLoader())
        dispatch({
            type: Create_User_Success
        })
        navigation.navigate("Login")
        // dispatch(getAuthenticatedUser())

    } catch (error) {
        console.log("Error", error);
        let errors = []
        if (error.response.data.Errors) {
            errors = error.response.data.Errors
        }
        console.log(errors)
        dispatch(toggleLoader())
        dispatch({
            type: Create_User_Failed
        })
        if (errors.length >= 0) {
            errors.forEach(err => {
                dispatch(showSnackbar(err.error))

            })
        } else {
            console.log("There")
            dispatch(showSnackbar("Error While Creating User"))

        }

    }
}


export const createSeller = (data) => async dispatch => {
    try {
        dispatch(toggleLoader())
        let res = await axios.post(`${apiDomain}/users/seller`, data);
        console.log("Success", res.data);
        await AsyncStorage.setItem("token", res.data.token)
        dispatch(toggleLoader())
        dispatch({
            type: Create_User_Success
        })
        dispatch(getAuthenticatedUser())

    } catch (error) {
        dispatch(toggleLoader())

        console.log("Error", error);
        if (error.response) {
            console.log("Error", error.response);
        }
        dispatch({
            type: Create_User_Failed
        })
    }
}


export const getAuthenticatedUser = () => async dispatch => {
    try {

        let token = await AsyncStorage.getItem('token')
        const config = {
            headers: {
                "Authorization": token,
            },
        };

        let res = await axios.get(`${apiDomain}/users/getProfile`, config);
        dispatch(toggleLoader())
        const { user } = res.data
        dispatch({
            type: User_Fetched_Success,
            payload: res.data.user
        })
        if (user.isSeller) {
            dispatch({
                type: Fetch_Products_Success,
                payload: user.products
            })
            dispatch(showSnackbar("Successfully Authenticated !"));
        } else {

        }

    } catch (error) {
        console.log("Error", error);
        dispatch({
            type: User_Fetched_Failed
        })
        dispatch(showSnackbar("Error while fetching profile."));

    }
}


export const updateUser = (data) => async dispatch => {
    try {

        let token = await AsyncStorage.getItem('token')
        const config = {
            headers: {
                "Authorization": token,
            },
        };
        dispatch({
            type: Updating_User
        })

        let res = await axios.put(`${apiDomain}/users/update`, data, config);

        dispatch(showSnackbar("User Updated Successfully"));
        dispatch({
            type: Update_User_Success,
            payload: res.data.user
        })


    } catch (error) {
        console.log("Error", error);
        dispatch({
            type: Update_User_Failed,
        })
        dispatch(showSnackbar("Error while updating profile."));

    }
}

export const updateProfilePicture = (data) => async dispatch => {
    try {

        let token = await AsyncStorage.getItem('token')
        const config = {
            headers: {
                "Authorization": token,
            },
        };
        dispatch({
            type: Updating_User
        })
        let res = await axios.put(`${apiDomain}/users/update/dp`, data, config);
        dispatch({
            type: Update_User_Success,
            payload: res.data.user
        })
        dispatch(showSnackbar("Profile picture Updated Successfully"));
    } catch (error) {
        console.log("Error", error.response);
        dispatch(showSnackbar("Error while updating profile picture"));
        dispatch({
            type: Update_User_Failed,
        })
    }
}

export const updateAnalytics = (price) => dispatch => {
    dispatch({
        type: Update_Analytics,
        payload: price
    })
}
