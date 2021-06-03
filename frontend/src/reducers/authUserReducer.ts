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
    accessToken: string | null
    refreshToken: string | null
    userId: number | null
    userName: string | null
    userEmail: string | null
    message: string | null
    didSucceed?: boolean
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
    accessToken: null,
    refreshToken: null,
    userId: null,
    userName: null,
    userEmail: null,
    message: null
}


// Reducer
export function authUserReducer(state: IAuthUserState = initialState, action: TDispatchAuthUser) {
    switch (action.type) {
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                didSucceed: true,
                message: action.payload
            }
        case REGISTER_USER_FAIL:
            return {
                ...state,
                didSucceed: false,
                message: action.payload
            }
        case ACTIVATE_USER_SUCCESS:
            return {
                ...state,
                didSucceed: true,
                message: action.payload
            }
        case ACTIVATE_USER_FAIL:
            return {
                ...state,
                didSucceed: false,
                message: action.payload
            }
        case CHECK_USER_AUTH_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case CHECK_USER_AUTH_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                accessToken: action.payload.access,
                refreshToken: action.payload.refresh,
                message: null
            }
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                userId: action.payload.id,
                userName: action.payload.username,
                userEmail: action.payload.email
            }
        case LOAD_USER_FAIL:
            return {
                ...state,
                user: null
            }
        case LOGIN_USER_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                didSucceed: false,
                accessToken: null,
                refreshToken: null,
                userId: null,
                userName: null,
                userEmail: null,
                message: action.payload
            }
        case LOGOUT_USER_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                accessToken: null,
                refreshToken: null,
                userId: null,
                userName: null,
                userEmail: null,
                message: null
            }
        case LOGOUT_USER_FAIL:
            return {
                ...state,
                message: null
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                didSucceed: true,
                message: action.payload
            }
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                didSucceed: false,
                message: action.payload
            }
        case CONFIRM_RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                didSucceed: true,
                message: action.payload
            }
        case CONFIRM_RESET_PASSWORD_FAIL:
            return {
                ...state,
                didSucceed: false,
                message: action.payload
            }
        default:
            return state
    }
}
