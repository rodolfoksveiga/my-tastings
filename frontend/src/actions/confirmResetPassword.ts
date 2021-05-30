// Import components, functions, types, variables, and styles
import axios from 'axios'
import { Dispatch } from 'redux'


// Types and interfaces
interface IConfirmResetPasswordSuccess {
    type: typeof CONFIRM_RESET_PASSWORD_SUCCESS
    payload: string
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

        const body = JSON.stringify({
            'uid': userId,
            'token': token,
            'new_password': newPassword,
            're_new_password': repeatNewPassword
        })

        try {
            await axios.post(URL + 'users/reset_password_confirm/', body, config)

            dispatch({
                type: CONFIRM_RESET_PASSWORD_SUCCESS,
                payload: 'Password reseted. Please, login.'
            })

        } catch (error) {
            let message = ''
            const hasUId = error.response.data.hasOwnProperty('uid')
            const hasToken = error.response.data.hasOwnProperty('token')

            if (hasUId) {
                message = 'Invalid user identification. Please, check your credentials.'
            } else if (hasToken) {
                message = 'Invalid activation token. Please, check your credentials.'
            } else {
                message = 'Password is too common. Try a stronger one.'
            }

            dispatch({
                type: CONFIRM_RESET_PASSWORD_FAIL,
                payload: message
            })

            console.log(error)
        }
    }
}
