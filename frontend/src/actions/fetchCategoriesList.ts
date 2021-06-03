// Import components, functions, types, variables, and styles
import axios from 'axios'
import { Dispatch } from 'redux'

import { TCategories } from '../components/CategoriesList'


// Types and interfaces
interface IFetchCategoriesListLoading {
    type: typeof FETCH_CATEGORIES_LIST_LOADING
}

interface IFetchCategoriesListSuccess {
    type: typeof FETCH_CATEGORIES_LIST_SUCCESS,
    payload: TCategories
}

interface IFetchCategoriesListFail {
    type: typeof FETCH_CATEGORIES_LIST_FAIL,
    payload: string
}

export type TDispatchFetchCategoriesList = IFetchCategoriesListLoading | IFetchCategoriesListSuccess | IFetchCategoriesListFail


// Action types
const URL = 'http://localhost:8000/api/categories/'
export const FETCH_CATEGORIES_LIST_LOADING = 'FETCH_CATEGORIES_LIST_LOADING'
export const FETCH_CATEGORIES_LIST_SUCCESS = 'FETCH_CATEGORIES_LIST_SUCCESS'
export const FETCH_CATEGORIES_LIST_FAIL = 'FETCH_CATEGORIES_LIST_FAIL'


// Action
export default function fetchCategoriesList(access: string | null) {
    return async (dispatch: Dispatch<TDispatchFetchCategoriesList>) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access
            }
        }

        try {
            dispatch({
                type: FETCH_CATEGORIES_LIST_LOADING
            })

            const response = await axios.get(URL, config)

            dispatch({
                type: FETCH_CATEGORIES_LIST_SUCCESS,
                payload: response.data
            })

        } catch (error) {
            dispatch({
                type: FETCH_CATEGORIES_LIST_FAIL,
                payload: 'Error while loading the Categories List. Reload the page.'
            })

            console.log(error)
        }

    }
}
