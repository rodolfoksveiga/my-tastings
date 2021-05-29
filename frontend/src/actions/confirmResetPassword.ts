// Import components, functions, types, variables, and styles
import axios from 'axios'
import { Dispatch } from 'redux'


// Types and interfaces
interface IConfirmResetPasswordSuccess {
    type: typeof CONFIRM_RESET_PASSWORD_SUCCESS
}

interface IConfirmResetPasswordFail {
    type: typeof CONFIRM_RESET_PASSWORD_FAIL
    payload: string
}


export type TDispatchConfirmResetPassword = IConfirmResetPasswordSuccess | IConfirmResetPasswordFail


// Action types
const URL = 'http://localhost:8000/api/auth/'
export const CONFIRM_RESET_PASSWORD_SUCCESS = 'CONFIRM_RESET_PASSWORD_SUCCESS'
export const CONFIRM_RESET_PASSWORD_FAIL = 'CONFIRM_RESET_PASSWORD_FAIL'


// Actions
export default function confirmResetPassword(userId: string, token: string, newPassword: string, repeatNewPassword: string) {
    return async (dispatch: Dispatch<TDispatchConfirmResetPassword>) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({ userId, token, newPassword, repeatNewPassword })

        try {
            await axios.post(URL + 'users/reset_password_confirm/', body, config)

            dispatch({
                type: CONFIRM_RESET_PASSWORD_SUCCESS
            })

        } catch (error) {
            dispatch({
                type: CONFIRM_RESET_PASSWORD_FAIL,
                payload: 'New password was not confirmed.'
            })

            console.log(error)
        }
    }
}
