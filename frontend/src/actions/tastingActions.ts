// Import components, functions, types, variables, and styles
import axios from 'axios'
import { Dispatch } from 'redux'

import { TTastingDispatch } from './types'


// VGlobal vriables
const URL = 'http://localhost:8000/api/tastings/'
export const TASTING_LOADING = 'TASTING_LOADING'
export const TASTING_FAIL = 'TASTING_FAIL'
export const TASTING_SUCCESS = 'TASTING_SUCCESS'


// Requests
export const getTasting = (id: string) => async (dispatch: Dispatch<TTastingDispatch>) => {
    try {
        dispatch({
            type: TASTING_LOADING
        })

        const response = await axios.get(URL + id + '/')

        dispatch({
            type: TASTING_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: TASTING_FAIL,
            payload: 'Error while retrieving the data. Check the Tasting Id.'
        })

        console.log(error)
    }
}