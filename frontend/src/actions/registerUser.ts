// Import components, functions, types, variables, and styles
import axios from 'axios'
import { Dispatch } from 'redux'


// Types and interfaces
interface IAuthRegisterUserSuccess {
    type: typeof REGISTER_USER_SUCCESS,
    payload: string
}

interface IAuthRegisterUserFail {
    type: typeof REGISTER_USER_FAIL
    payload: string
}

export type TDispatchRegisterUser = IAuthRegisterUserSuccess | IAuthRegisterUserFail


// Action types
const URL = 'http://localhost:8000/api/auth/'
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL'


// Actions
export default function registerUser(username: string, email: string, password: string, repeatPassword: string) {
    return async (dispatch: Dispatch<TDispatchRegisterUser>) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({
            'username': username,
            'email': email,
            'password': password,
            're_password': repeatPassword
        })

        try {
            await axios.post(URL + 'users/', body, config)

            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: 'User registered. Please, check your email to activate your account.'
            })

        } catch (error) {
            let message = ''
            const hasUsername = error.response.data.hasOwnProperty('username')
            const hasEmail = error.response.data.hasOwnProperty('email')
            const hasPassword = error.response.data.hasOwnProperty('password')

            if (hasUsername && hasEmail) {
                message = 'Username and email already exist.'
            } else {
                if (hasUsername) {
                    message = 'Username already exists.'
                }
                if (hasEmail) {
                    message = 'Email already exists.'
                }
            }

            if (hasPassword) {
                message = 'Password is too common. Try a stronger one.'
            }

            dispatch({
                type: REGISTER_USER_FAIL,
                payload: message
            })

            console.log(error)
        }
    }
}
