// Import components, functions, types, variables, and styles
import axios from 'axios'
import { Dispatch } from 'redux'

import { ITasting } from '../components/TastingsList'
import { ITastingForm } from '../components/CreateTasting'


// Types and interfaces
interface ICreateTastingSuccess {
    type: typeof CREATE_TASTING_SUCCESS,
    payload: ITasting
}

interface ICreateTastingFail {
    type: typeof CREATE_TASTING_FAIL,
    payload: string
}

export type TDispatchCreateTasting = ICreateTastingSuccess | ICreateTastingFail


// Action types
const URL = 'http://localhost:8000/api/tastings/'
export const CREATE_TASTING_SUCCESS = 'CREATE_TASTING_SUCESS'
export const CREATE_TASTING_FAIL = 'CREATE_TASTING_FAIL'


// Action
export default function createTasting(access: string | null, body: ITastingForm) {
    return async (dispatch: Dispatch<TDispatchCreateTasting>) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + access,
                    'Accept': 'application/json'
                }
            }

            const response = await axios.post(URL, body, config)

            dispatch({
                type: CREATE_TASTING_SUCCESS,
                payload: response.data
            })

        } catch (error) {
            dispatch({
                type: CREATE_TASTING_FAIL,
                payload: 'Error while creating the data. Check the input fields.'
            })

            console.log(error)
        }
    }
}
