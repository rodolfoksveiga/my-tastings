// Import components, functions, types, variables, and styles
import { initialState } from './rootReducer'
import {
    FETCH_TASTINGS_LIST_LOADING,
    FETCH_TASTINGS_LIST_SUCCESS,
    FETCH_TASTINGS_LIST_FAIL,
    TDispatchFetchTastingsList
} from '../actions/fetchTastingsList'
import { TTastings } from '../components/types'


// Types and interfaces
interface IFetchTastingsListState {
    isLoading: boolean,
    tastings?: TTastings,
    error?: string
}


// Reducer
export function fetchTastingsListReducer(state: IFetchTastingsListState = initialState, action: TDispatchFetchTastingsList) {
    switch (action.type) {
        case FETCH_TASTINGS_LIST_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_TASTINGS_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                tastings: action.payload
            }
        case FETCH_TASTINGS_LIST_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state
    }
}