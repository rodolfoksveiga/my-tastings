// Import components, functions, types, variables, and styles
import axios from 'axios'
import { Dispatch } from 'redux'

import { TTastings } from '../components/types'


// Types and interfaces
interface IFetchTastingsListLoading {
    type: typeof FETCH_TASTINGS_LIST_LOADING
}

interface IFetchTastingsListSuccess {
    type: typeof FETCH_TASTINGS_LIST_SUCCESS,
    payload: TTastings
}

interface IFetchTastingsListFail {
    type: typeof FETCH_TASTINGS_LIST_FAIL,
    payload: string
}

export type TDispatchFetchTastingsList = IFetchTastingsListLoading | IFetchTastingsListSuccess | IFetchTastingsListFail


// Action types
const URL = 'http://localhost:8000/api/tastings/'
export const FETCH_TASTINGS_LIST_LOADING = 'FETCH_TASTINGS_LIST_LOADING'
export const FETCH_TASTINGS_LIST_SUCCESS = 'FETCH_TASTINGS_LIST_SUCCESS'
export const FETCH_TASTINGS_LIST_FAIL = 'FETCH_TASTINGS_LIST_FAIL'


// Action
export function fetchTastingsList() {
    return async (dispatch: Dispatch<TDispatchFetchTastingsList>) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access')
            }
        }

        try {
            dispatch({
                type: FETCH_TASTINGS_LIST_LOADING
            })

            const response = await axios.get(URL, config)

            dispatch({
                type: FETCH_TASTINGS_LIST_SUCCESS,
                payload: response.data
            })

        } catch (error) {
            dispatch({
                type: FETCH_TASTINGS_LIST_FAIL,
                payload: 'Error while loading the data. Reload the page.'
            })

            console.log(error)
        }

    }
}

