// Import components, functions, types, variables, and styles
import axios from 'axios'
import { Dispatch } from 'redux'

import { TProducers } from '../components/ProducersList'


// Types and interfaces
interface IFetchProducersListLoading {
    type: typeof FETCH_PRODUCERS_LIST_LOADING
}

interface IFetchProducersListSuccess {
    type: typeof FETCH_PRODUCERS_LIST_SUCCESS,
    payload: TProducers
}

interface IFetchProducersListFail {
    type: typeof FETCH_PRODUCERS_LIST_FAIL,
    payload: string
}

export type TDispatchFetchProducersList = IFetchProducersListLoading | IFetchProducersListSuccess | IFetchProducersListFail


// Action types
const URL = 'http://localhost:8000/api/producers/'
export const FETCH_PRODUCERS_LIST_LOADING = 'FETCH_PRODUCERS_LIST_LOADING'
export const FETCH_PRODUCERS_LIST_SUCCESS = 'FETCH_PRODUCERS_LIST_SUCCESS'
export const FETCH_PRODUCERS_LIST_FAIL = 'FETCH_PRODUCERS_LIST_FAIL'


// Action
export default function fetchProducersList(access: string | null) {
    return async (dispatch: Dispatch<TDispatchFetchProducersList>) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access
            }
        }

        try {
            dispatch({
                type: FETCH_PRODUCERS_LIST_LOADING
            })

            const response = await axios.get(URL, config)

            dispatch({
                type: FETCH_PRODUCERS_LIST_SUCCESS,
                payload: response.data
            })

        } catch (error) {
            dispatch({
                type: FETCH_PRODUCERS_LIST_FAIL,
                payload: 'Error while loading the Producers List. Reload the page.'
            })

            console.log(error)
        }

    }
}
