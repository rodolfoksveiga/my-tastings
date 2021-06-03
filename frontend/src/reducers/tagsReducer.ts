// Import components, functions, types, variables, and styles
import {
    FETCH_TAGS_LIST_LOADING,
    FETCH_TAGS_LIST_SUCCESS,
    FETCH_TAGS_LIST_FAIL,
    TDispatchFetchTagsList
} from '../actions/fetchTagsList'
import { TTags } from '../actions/fetchTagsList'


// Types and interfaces
interface IFetchTagsListState {
    isLoading: boolean,
    data: TTags | null,
    message: string | null
}


// Global variables
const initialState = {
    isLoading: false,
    data: null,
    message: null
}


// Reducer
export function tagsReducer(state: IFetchTagsListState = initialState, action: TDispatchFetchTagsList) {
    switch (action.type) {
        case FETCH_TAGS_LIST_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_TAGS_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                message: null
            }
        case FETCH_TAGS_LIST_FAIL:
            return {
                ...state,
                isLoading: false,
                data: null,
                message: action.payload
            }
        default:
            return state
    }
}
