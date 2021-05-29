// Import components, functions, types, variables, and styles
import {
    FETCH_TASTING_DETAILS_LOADING,
    FETCH_TASTING_DETAILS_SUCCESS,
    FETCH_TASTING_DETAILS_FAIL,
    TDispatchFetchTastingDetails
} from '../actions/fetchTastingDetails'
import { ITasting } from '../components/types'


// Types and interfaces
interface IFetchTastingDetailsState {
    isLoading: boolean,
    tasting: ITasting | null,
    error: string | null
}

// Global variables
const initialState = {
    isLoading: false,
    tasting: null,
    error: null
}


// Reducer
export function fetchTastingDetailsReducer(state: IFetchTastingDetailsState = initialState, action: TDispatchFetchTastingDetails) {
    switch (action.type) {
        case FETCH_TASTING_DETAILS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_TASTING_DETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                tasting: action.payload
            }
        case FETCH_TASTING_DETAILS_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state
    }
}
