// Import components, functions, types, variables, and styles
import {
    LOAD_USER_PROCESSING,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    IUser,
    TDispatchLoadUser
} from '../actions/loadUser'
import {
    LOGIN_USER_PROCESSING,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    TDispatchLoginUser
} from '../actions/loginUser'
import {
    CHECK_USER_AUTH_PROCESSING,
    CHECK_USER_AUTH_SUCCESS,
    CHECK_USER_AUTH_FAIL,
    TDispatchCheckUserAuth
} from '../actions/checkUserAuth'
import {
    LOGOUT_USER_PROCESSING,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    TDispatchLogoutUser
} from '../actions/logoutUser'


// Types and interfaces
interface IAuthUserState {
    isLoading: boolean,
    access: string | null,
    refresh: string | null,
    isAuthenticated: boolean | null,
    user: IUser | null,
    error: string | null
}

type TDispatchAuthUser = TDispatchLoadUser | TDispatchLoginUser | TDispatchCheckUserAuth | TDispatchLogoutUser


// Global variables
const initialState = {
    isLoading: false,
    isAuthenticated: null,
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    user: null,
    error: null
}


export function authUserReducer(state: IAuthUserState = initialState, action: TDispatchAuthUser) {
    switch (action.type) {
        case CHECK_USER_AUTH_PROCESSING:
            return {
                ...state,
                isLoading: true
            }
        case CHECK_USER_AUTH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                error: null
            }
        case LOGIN_USER_PROCESSING:
            return {
                ...state,
                isLoading: true
            }
        case LOGIN_USER_SUCCESS:
            localStorage.setItem('access', action.payload.access)
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                access: action.payload.access,
                refresh: action.payload.refresh,
                error: null
            }
        case LOAD_USER_PROCESSING:
            return {
                ...state,
                isLoading: true
            }
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                error: null
            }
        case LOAD_USER_FAIL:
            return {
                ...state,
                isLoading: false,
                user: null,
                error: action.payload
            }
        case CHECK_USER_AUTH_FAIL:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                error: action.payload
            }
        case LOGIN_USER_FAIL:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                access: null,
                refresh: null,
                user: null,
                error: action.payload
            }
        case LOGOUT_USER_PROCESSING:
            return {
                ...state,
                isLoading: true
            }
        case LOGOUT_USER_SUCCESS:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                access: null,
                refresh: null,
                user: null,
                error: null
            }
        case LOGOUT_USER_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state
    }
}