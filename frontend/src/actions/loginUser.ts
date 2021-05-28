// Import components, functions, types, variables, and styles
import axios from 'axios'
import { Dispatch } from 'redux'

import loadUser from './loadUser'


// Types and interfaces
interface IAuthLoginUserProcessing {
    type: typeof LOGIN_USER_PROCESSING
}

interface IAuthLoginUserSuccess {
    type: typeof LOGIN_USER_SUCCESS
    payload: {
        access: string,
        refresh: string
    }
}

interface IAuthLoginUserFail {
    type: typeof LOGIN_USER_FAIL
    payload: string
}

export type TDispatchLoginUser = IAuthLoginUserProcessing | IAuthLoginUserSuccess | IAuthLoginUserFail


// Action types
const URL = 'http://localhost:8000/api/auth/'
export const LOGIN_USER_PROCESSING = 'LOGIN_USER_PROCESSING'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL'


// Actions
export function loginUser(username: string, password: string) {
    return async (dispatch: Dispatch<TDispatchLoginUser>) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({
            username,
            password
        })

        try {
            dispatch({
                type: LOGIN_USER_PROCESSING
            })

            const response = await axios.post(URL + 'jwt/create/', body, config)

            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: response.data
            })

            // ATTENTION HERE!
            dispatch<any>(loadUser())

        } catch (error) {
            dispatch({
                type: LOGIN_USER_FAIL,
                payload: 'Incorrect username or password.'
            })

            console.log(error)
        }
    }
}
