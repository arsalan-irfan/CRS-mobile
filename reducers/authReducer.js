import { User_Loading, User_Login_Success, User_Login_Failed, User_Fetched_Failed, User_Fetched_Success, User_Logout, Updating_User, Update_User_Success, Update_User_Failed,Set_User_Authenticated} from '../actions/actionTypes'


const initialState = {
    user: null,
    token: null,
    isLoggedIn: false,
    isLoading: false,
    updatingUser: false,

};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case Set_User_Authenticated:
            return {
                ...state,
                isLoggedIn:true,
                isLoading:false
            }
        case User_Loading:
            return {
                ...state,
                isLoading: !state.isLoading
            }
        case User_Logout:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                token: null
            }
        case User_Login_Failed:
            return {
                ...state,
                token: null,
                isLoggedIn: false
            }
        case User_Login_Success:
            return {
                ...state,
                token: payload.token,
                isLoggedIn:true
            }
        case User_Fetched_Failed:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                token: null,
            }
        case User_Fetched_Success:
            return {
                ...state,
                user: payload,
                isLoggedIn: true
            }
        case Updating_User:
            return {
                ...state,
                updatingUser: true
            }
        case Update_User_Failed:
            return {
                ...state,
                updatingUser: false
            }
        case Update_User_Success:
            return {
                ...state,
                user: payload,
                updatingUser: false
            }

        default:
            return state;
    }
}