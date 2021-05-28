// Import components, functions, types, variables, and styles
import { Dispatch } from 'redux'


// Types and interfaces
interface ILogoutUserProcessing {
    type: typeof LOGOUT_USER_PROCESSING
}

interface ILogoutUserSuccess {
    type: typeof LOGOUT_USER_SUCCESS
}

interface ILogoutUserFail {
    type: typeof LOGOUT_USER_FAIL
    payload: string
}


export type TDispatchLogoutUser = ILogoutUserProcessing | ILogoutUserSuccess | ILogoutUserFail


// Action types
export const LOGOUT_USER_PROCESSING = 'LOGOUT_USER_PROCESSING'
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS'
export const LOGOUT_USER_FAIL = 'LOGOUT_USER_FAIL'


// Actions
export default function logoutUser() {
    return async (dispatch: Dispatch<TDispatchLogoutUser>) => {
        try {
            dispatch({
                type: LOGOUT_USER_PROCESSING
            })

            dispatch({
                type: LOGOUT_USER_SUCCESS
            })

        } catch (error) {
            dispatch({
                type: LOGOUT_USER_FAIL,
                payload: "Couldn't remove access and refresh tokens."
            })

            console.log(error)
        }
    }
}
