// Import components, functions, types, variables, and styles
import {
    FETCH_TASTINGS_LIST_LOADING,
    FETCH_TASTINGS_LIST_SUCCESS,
    FETCH_TASTINGS_LIST_FAIL,
    TDispatchFetchTastingsList
} from '../actions/fetchTastingsList'
import { TTastings } from '../components/TastingsList'


// Types and interfaces
interface IFetchTastingsListState {
    isLoading: boolean,
    tastings: TTastings | null,
    error: string | null
}


// Global variables
const initialState = {
    isLoading: false,
    tastings: null,
    error: null
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
                tastings: action.payload,
                error: null
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
