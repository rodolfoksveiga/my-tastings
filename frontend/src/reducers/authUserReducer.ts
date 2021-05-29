// Import components, functions, types, variables, and styles
import {
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    TDispatchRegisterUser
} from '../actions/registerUser'
import {
    ACTIVATE_USER_SUCCESS,
    ACTIVATE_USER_FAIL,
    TDispatchActivateUser
} from '../actions/activateUser'
import {
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    IUser,
    TDispatchLoadUser
} from '../actions/loadUser'
import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    TDispatchLoginUser
} from '../actions/loginUser'
import {
    CHECK_USER_AUTH_SUCCESS,
    CHECK_USER_AUTH_FAIL,
    TDispatchCheckUserAuth
} from '../actions/checkUserAuth'
import {
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    TDispatchLogoutUser
} from '../actions/logoutUser'
import {
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    TDispatchResetPassword
} from '../actions/resetPassword'
import {
    CONFIRM_RESET_PASSWORD_SUCCESS,
    CONFIRM_RESET_PASSWORD_FAIL,
    TDispatchConfirmResetPassword
} from '../actions/confirmResetPassword'


// Types and interfaces
interface IAuthUserState {
    isAuthenticated: boolean
    access: string | null
    refresh: string | null
    user: IUser | null
    error: string | null
}

type TDispatchAuthUser = (
    TDispatchRegisterUser |
    TDispatchActivateUser |
    TDispatchLoadUser |
    TDispatchLoginUser |
    TDispatchCheckUserAuth |
    TDispatchLogoutUser |
    TDispatchResetPassword |
    TDispatchConfirmResetPassword
)


// Global variables
const initialState = {
    isAuthenticated: false,
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    user: null,
    error: null
}


// Reducer
export function authUserReducer(state: IAuthUserState = initialState, action: TDispatchAuthUser) {
    switch (action.type) {
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                error: null
            }
        case REGISTER_USER_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case ACTIVATE_USER_SUCCESS:
            return {
                ...state,
                error: null
            }
        case ACTIVATE_USER_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CHECK_USER_AUTH_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                error: null
            }
        case LOGIN_USER_SUCCESS:
            localStorage.setItem('access', action.payload.access)
            return {
                ...state,
                isAuthenticated: true,
                access: action.payload.access,
                refresh: action.payload.refresh,
                error: null
            }
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                error: null
            }
        case LOAD_USER_FAIL:
            return {
                ...state,
                user: null,
                error: action.payload
            }
        case CHECK_USER_AUTH_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                error: action.payload
            }
        case LOGIN_USER_FAIL:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return {
                ...state,
                isAuthenticated: false,
                access: null,
                refresh: null,
                user: null,
                error: action.payload
            }
        case LOGOUT_USER_SUCCESS:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return {
                ...state,
                isAuthenticated: false,
                access: null,
                refresh: null,
                user: null,
                error: null
            }
        case LOGOUT_USER_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state
            }
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CONFIRM_RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                error: null
            }
        case CONFIRM_RESET_PASSWORD_FAIL:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}
