// Import components, functions, types, variables, and styles
import axios from 'axios'
import { Dispatch } from 'redux'

import { TId } from '../components/types'


// Types and interfaces
interface IDeleteTastingProcessing {
    type: typeof DELETE_TASTING_PROCESSING
}

interface IDeleteTastingSuccess {
    type: typeof DELETE_TASTING_SUCCESS,
    payload: TId
}

interface IDeleteTastingFail {
    type: typeof DELETE_TASTING_FAIL,
    payload: string
}

export type TDispatchDeleteTasting = IDeleteTastingProcessing | IDeleteTastingSuccess | IDeleteTastingFail


// Action types
const URL = 'http://localhost:8000/api/tastings/'
export const DELETE_TASTING_PROCESSING = 'DELETE_TASTING_PROCESSING'
export const DELETE_TASTING_SUCCESS = 'DELETE_TASTING_SUCESS'
export const DELETE_TASTING_FAIL = 'DELETE_TASTING_FAIL'


// Action
export function deleteTasting(id: TId) {
    return async (dispatch: Dispatch<TDispatchDeleteTasting>) => {
        try {
            dispatch({
                type: DELETE_TASTING_PROCESSING
            })

            await axios.delete(URL + id + '/')

            alert('The data was deleted!')

            dispatch({
                type: DELETE_TASTING_SUCCESS,
                payload: id
            })

        } catch (error) {
            dispatch({
                type: DELETE_TASTING_FAIL,
                payload: 'Error while deleting the data. Try again.'
            })

            console.log(error)
        }
    }
}
