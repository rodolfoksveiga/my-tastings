// Import components, functions, types, variables, and styles
import axios from 'axios'
import { Dispatch } from 'redux'


// Types and interfaces
interface IResetPasswordSuccess {
    type: typeof RESET_PASSWORD_SUCCESS,
    payload: string
}

interface IResetPasswordFail {
    type: typeof RESET_PASSWORD_FAIL
    payload: string
}


export type TDispatchResetPassword = IResetPasswordSuccess | IResetPasswordFail


// Action types
const URL = 'http://localhost:8000/api/auth/'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_FAIL = 'RESET_PASSWORD_FAIL'


// Actions
export default function resetPassword(email: string) {
    return async (dispatch: Dispatch<TDispatchResetPassword>) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({ email })

        try {
            await axios.post(URL + 'users/reset_password/', body, config)

            dispatch({
                type: RESET_PASSWORD_SUCCESS,
                payload: 'Password reset requested. Please, check your email to confirm.'
            })

        } catch (error) {
            dispatch({
                type: RESET_PASSWORD_FAIL,
                payload: 'Invalid email.'
            })

            console.log(error)
        }
    }
}
