// Import components, functions, types, variables, and styles
import axios from 'axios'
import { Dispatch } from 'redux'

import { TId, ITastingForm } from '../components/types'


// Types and interfaces
interface IUpdateTastingProcessing {
    type: typeof UPDATE_TASTING_PROCESSING
}

interface IUpdateTastingSuccess {
    type: typeof UPDATE_TASTING_SUCCESS
}

interface IUpdateTastingFail {
    type: typeof UPDATE_TASTING_FAIL,
    payload: string
}

export type TDispatchUpdateTasting = IUpdateTastingProcessing | IUpdateTastingSuccess | IUpdateTastingFail


// Action types
const URL = 'http://localhost:8000/api/tastings/'
export const UPDATE_TASTING_PROCESSING = 'UPDATE_TASTING_PROCESSING'
export const UPDATE_TASTING_SUCCESS = 'UPDATE_TASTING_SUCESS'
export const UPDATE_TASTING_FAIL = 'UPDATE_TASTING_FAIL'


// Action
export function updateTasting(id: TId, data: ITastingForm) {
    return async (dispatch: Dispatch<TDispatchUpdateTasting>) => {
        try {
            dispatch({
                type: UPDATE_TASTING_PROCESSING
            })

            await axios.put(URL + id + '/', data)

            dispatch({
                type: UPDATE_TASTING_SUCCESS
            })

        } catch (error) {
            dispatch({
                type: UPDATE_TASTING_FAIL,
                payload: 'Error while updating the data. Check the input fields.'
            })

            console.log(error)
        }
    }
}
