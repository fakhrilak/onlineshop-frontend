import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE
} from "../actions/Type"

const initialState = {
    isAuthenticated: localStorage.getItem('token') ? true : false,
    users:null,
    message: '',
    loading: true,
    role: 0,
    status :0,
    route : ""
};

export default function (state = initialState, action) {
    const {type, payload} = action;
    
    switch (type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                users: payload.data,
                loading: false,
                message: payload.message,
                status : 200
            }
            case LOGIN_FAIL:
                return {
                    ...state,
                    message: payload.message,
                    loading: false,
                    isLogin: false,
                    status : 400
                }
            case USER_LOADED:
                localStorage.setItem('isAuthenticated', true)
                return{
                    ...state,
                    isAuthenticated : true,
                    loading : false,
                    users: payload.data,
                    role: payload.data.role,
                }
            case LOGOUT:
                localStorage.removeItem('token')
                return{
                    ...state,
                    users:null,
                    isAuthenticated:false,
                    loading: false,
                    role : 0,
                    token: null
                }
            case "UPDATE_ROUTE":
                return{
                    ...state,
                    route : payload
                }
            default:
                return state;
    }
}