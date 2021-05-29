// Import components, functions, types, variables, and styles
import axios from 'axios'
import { Dispatch } from 'redux'


// Types and interfaces
interface IAuthActivateUserSuccess {
    type: typeof ACTIVATE_USER_SUCCESS
}

interface IAuthActivateUserFail {
    type: typeof ACTIVATE_USER_FAIL
    payload: string
}

export type TDispatchActivateUser = IAuthActivateUserSuccess | IAuthActivateUserFail


// Action types
const URL = 'http://localhost:8000/api/auth/'
export const ACTIVATE_USER_SUCCESS = 'ACTIVATE_USER_SUCCESS'
export const ACTIVATE_USER_FAIL = 'ACTIVATE_USER_FAIL'


// Actions
export default function activateUser(userId: string, token: string) {
    return async (dispatch: Dispatch<TDispatchActivateUser>) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({
            'uid': userId,
            'token': token
        })

        try {
            await axios.post(URL + 'users/activation/', body, config)

            dispatch({
                type: ACTIVATE_USER_SUCCESS
            })

        } catch (error) {
            dispatch({
                type: ACTIVATE_USER_FAIL,
                payload: 'Incorrect username or password.'
            })

            console.log(error)
        }
    }
}
