// Import components, functions, types, variables, and styles
import {
    FETCH_BEVERAGES_LIST_LOADING,
    FETCH_BEVERAGES_LIST_SUCCESS,
    FETCH_BEVERAGES_LIST_FAIL,
    TDispatchFetchBeveragesList
} from '../actions/fetchBeveragesList'
import {
    CREATE_BEVERAGE_SUCCESS,
    CREATE_BEVERAGE_FAIL,
    TDispatchCreateBeverage
} from '../actions/createBeverage'
import { TBeverages } from '../components/BeveragesList'


// Types and interfaces
type TDispatchBeverage = TDispatchFetchBeveragesList | TDispatchCreateBeverage

interface IBeveragesListState {
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
export function beveragesReducer(state: IBeveragesListState = initialState, action: TDispatchBeverage) {
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
                data: action.payload,
                message: null
            }
        case FETCH_BEVERAGES_LIST_FAIL:
            return {
                ...state,
                isLoading: false,
                data: null,
                message: action.payload
            }
        case CREATE_BEVERAGE_SUCCESS:
            return {
                ...state,
                message: null
            }
        case CREATE_BEVERAGE_FAIL:
            return {
                ...state,
                message: action.payload
            }
        default:
            return state
    }
}
