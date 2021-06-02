// Import components, functions, types, variables, and styles
import axios from 'axios'
import { Dispatch } from 'redux'


// Types and interfaces
export interface IUser {
    id: number
    username: string
    email: string
}

interface IAuthLoadUserSuccess {
    type: typeof LOAD_USER_SUCCESS
    payload: IUser
}

interface IAuthLoadUserFail {
    type: typeof LOAD_USER_FAIL
}

export type TDispatchLoadUser = IAuthLoadUserSuccess | IAuthLoadUserFail


// Action types
const URL = 'http://localhost:8000/api/auth/'
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'
export const LOAD_USER_FAIL = 'LOAD_USER_FAIL'


// Actions
export default function loadUser(access: string | null) {
    return async (dispatch: Dispatch<TDispatchLoadUser>) => {
        if (access) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + access,
                    'Accept': 'application/json'
                }
            }

            try {
                const response = await axios.get(URL + 'users/me/', config)

                dispatch({
                    type: LOAD_USER_SUCCESS,
                    payload: response.data
                })

            } catch (error) {
                dispatch({
                    type: LOAD_USER_FAIL
                })

                console.log(error)
            }
        } else {
            dispatch({
                type: LOAD_USER_FAIL
            })
        }
    }
}
