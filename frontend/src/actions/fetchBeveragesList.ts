// Import components, functions, types, variables, and styles
import axios from 'axios'
import { Dispatch } from 'redux'

import { TBeverages } from '../components/BeveragesList'


// Types and interfaces
interface IFetchBeveragesListLoading {
    type: typeof FETCH_BEVERAGES_LIST_LOADING
}

interface IFetchBeveragesListSuccess {
    type: typeof FETCH_BEVERAGES_LIST_SUCCESS,
    payload: TBeverages
}

interface IFetchBeveragesListFail {
    type: typeof FETCH_BEVERAGES_LIST_FAIL,
    payload: string
}

export type TDispatchFetchBeveragesList = IFetchBeveragesListLoading | IFetchBeveragesListSuccess | IFetchBeveragesListFail


// Action types
const URL = 'http://localhost:8000/api/beverages/'
export const FETCH_BEVERAGES_LIST_LOADING = 'FETCH_BEVERAGES_LIST_LOADING'
export const FETCH_BEVERAGES_LIST_SUCCESS = 'FETCH_BEVERAGES_LIST_SUCCESS'
export const FETCH_BEVERAGES_LIST_FAIL = 'FETCH_BEVERAGES_LIST_FAIL'


// Action
export default function fetchBeveragesList() {
    return async (dispatch: Dispatch<TDispatchFetchBeveragesList>) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access')
            }
        }

        try {
            dispatch({
                type: FETCH_BEVERAGES_LIST_LOADING
            })

            const response = await axios.get(URL, config)

            dispatch({
                type: FETCH_BEVERAGES_LIST_SUCCESS,
                payload: response.data
            })

        } catch (error) {
            dispatch({
                type: FETCH_BEVERAGES_LIST_FAIL,
                payload: 'Error while loading the Beverages List. Reload the page.'
            })

            console.log(error)
        }

    }
}

