// Import components, functions, types, variables, and styles
import axios from 'axios'
import { Dispatch } from 'redux'


// Types and interfaces
interface ICheckUserAuthSuccess {
    type: typeof CHECK_USER_AUTH_SUCCESS
}

interface ICheckUserAuthFail {
    type: typeof CHECK_USER_AUTH_FAIL
}


export type TDispatchCheckUserAuth = ICheckUserAuthSuccess | ICheckUserAuthFail


// Action types
const URL = 'http://localhost:8000/api/auth/'
export const CHECK_USER_AUTH_SUCCESS = 'CHECK_USER_AUTH_SUCCESS'
export const CHECK_USER_AUTH_FAIL = 'CHECK_USER_AUTH_FAIL'


// Actions
export default function checkAuthentication() {
    return async (dispatch: Dispatch<TDispatchCheckUserAuth>) => {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }

            const body = JSON.stringify({
                token: localStorage.getItem('access')
            })

            try {
                const response = await axios.post(URL + 'jwt/verify/', body, config)

                if (response.data.code !== 'token_not_valid') {
                    dispatch({
                        type: CHECK_USER_AUTH_SUCCESS
                    })
                } else {
                    dispatch({
                        type: CHECK_USER_AUTH_FAIL,
                        payload: 'Token is invalid or expired.'
                    })
                }

            } catch (error) {
                dispatch({
                    type: CHECK_USER_AUTH_FAIL
                })

                console.log(error)
            }
        } else {
            dispatch({
                type: CHECK_USER_AUTH_FAIL
            })
        }
    }
}
