// Import components, functions, types, variables, and styles
import axios from 'axios'
import { Dispatch } from 'redux'

// Types and interfaces
interface ITag {
    id: string
    modified_at: string
    name: string
    user: number
    userName: string
}

export type TTags = ITag[]

interface IFetchTagsListLoading {
    type: typeof FETCH_TAGS_LIST_LOADING
}

interface IFetchTagsListSuccess {
    type: typeof FETCH_TAGS_LIST_SUCCESS,
    payload: TTags
}

interface IFetchTagsListFail {
    type: typeof FETCH_TAGS_LIST_FAIL,
    payload: string
}

export type TDispatchFetchTagsList = IFetchTagsListLoading | IFetchTagsListSuccess | IFetchTagsListFail


// Action types
const URL = 'http://localhost:8000/api/tags/'
export const FETCH_TAGS_LIST_LOADING = 'FETCH_TAGS_LIST_LOADING'
export const FETCH_TAGS_LIST_SUCCESS = 'FETCH_TAGS_LIST_SUCCESS'
export const FETCH_TAGS_LIST_FAIL = 'FETCH_TAGS_LIST_FAIL'


// Action
export default function fetchTagsList(access: string | null) {
    return async (dispatch: Dispatch<TDispatchFetchTagsList>) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access
            }
        }

        try {
            dispatch({
                type: FETCH_TAGS_LIST_LOADING
            })

            const response = await axios.get(URL, config)

            dispatch({
                type: FETCH_TAGS_LIST_SUCCESS,
                payload: response.data
            })

        } catch (error) {
            dispatch({
                type: FETCH_TAGS_LIST_FAIL,
                payload: 'Error while loading the Tags List. Reload the page.'
            })

            console.log(error)
        }

    }
}
