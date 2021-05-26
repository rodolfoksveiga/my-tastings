// Import components, functions, types, variables, and styles
import axios from 'axios'
import { Dispatch } from 'redux'

import { TTastingsDispatch } from './types'


// VGlobal vriables
const URL = 'http://localhost:8000/api/tastings/'
export const TASTINGS_LOADING = 'TASTINGS_LOADING'
export const TASTINGS_FAIL = 'TASTINGS_FAIL'
export const TASTINGS_SUCCESS = 'TASTINGS_SUCCESS'


// Requests
export const getTastings = () => async (dispatch: Dispatch<TTastingsDispatch>) => {
    try {
        dispatch({
            type: TASTINGS_LOADING
        })

        const response = await axios.get(URL)

        dispatch({
            type: TASTINGS_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: TASTINGS_FAIL,
            payload: 'Error while retrieving the data. Reload the page.'
        })

        console.log(error)
    }
}