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
    payload: string
}

export type TDispatchLoadUser = IAuthLoadUserSuccess | IAuthLoadUserFail


// Action types
const URL = 'http://localhost:8000/api/auth/'
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'
export const LOAD_USER_FAIL = 'LOAD_USER_FAIL'


// Actions
export default function loadUser() {
    return async (dispatch: Dispatch<TDispatchLoadUser>) => {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('access'),
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
                    type: LOAD_USER_FAIL,
                    payload: "Couldn't load the user."
                })

                console.log(error)
            }
        } else {
            dispatch({
                type: LOAD_USER_FAIL,
                payload: "Couldn't find the user. Check your username."
            })
        }
    }
}
