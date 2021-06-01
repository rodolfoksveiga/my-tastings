// Import components, functions, types, variables, and styles
import {
    FETCH_BEVERAGES_LIST_LOADING,
    FETCH_BEVERAGES_LIST_SUCCESS,
    FETCH_BEVERAGES_LIST_FAIL,
    TDispatchFetchBeveragesList
} from '../actions/fetchBeveragesList'
import { TBeverages } from '../components/BeveragesList'


// Types and interfaces
interface IFetchBeveragesListState {
    isLoading: boolean,
    data: TBeverages | null,
    message: string | null
}


// Global variables
const initialState = {
    isLoading: false,
    data: null,
    message: null
}


// Reducer
export function beveragesReducer(state: IFetchBeveragesListState = initialState, action: TDispatchFetchBeveragesList) {
    switch (action.type) {
        case FETCH_BEVERAGES_LIST_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_BEVERAGES_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        case FETCH_BEVERAGES_LIST_FAIL:
            return {
                ...state,
                isLoading: false,
                message: action.payload
            }
        default:
            return state
    }
}
