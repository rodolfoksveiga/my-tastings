// Import components, functions, types, variables, and styles
import axios from 'axios'
import { Dispatch } from 'redux'

import { TId, ITasting } from '../components/types'


// Types and interfaces
interface IFetchTastingDetailsLoading {
    type: typeof FETCH_TASTING_DETAILS_LOADING
}

interface IFetchTastingDetailsSuccess {
    type: typeof FETCH_TASTING_DETAILS_SUCCESS,
    payload: ITasting
}

interface IFetchTastingDetailsFail {
    type: typeof FETCH_TASTING_DETAILS_FAIL,
    payload: string
}

export type TDispatchFetchTastingDetails = IFetchTastingDetailsLoading | IFetchTastingDetailsSuccess | IFetchTastingDetailsFail


// Global types
const URL = 'http://localhost:8000/api/tastings/'
export const FETCH_TASTING_DETAILS_LOADING = 'FETCH_TASTING_DETAILS_LOADING'
export const FETCH_TASTING_DETAILS_SUCCESS = 'FETCH_TASTING_DETAILS_SUCCESS'
export const FETCH_TASTING_DETAILS_FAIL = 'FETCH_TASTING_DETAILS_FAIL'


// Action
export function fetchTastingDetails(id: TId) {
    return async (dispatch: Dispatch<TDispatchFetchTastingDetails>) => {
        try {
            dispatch({
                type: FETCH_TASTING_DETAILS_LOADING
            })

            const response = await axios.get(URL + id + '/')

            dispatch({
                type: FETCH_TASTING_DETAILS_SUCCESS,
                payload: response.data
            })

        } catch (error) {
            dispatch({
                type: FETCH_TASTING_DETAILS_FAIL,
                payload: 'Error while loading the data. Reload the page.'
            })

            console.log(error)
        }
    }
}
