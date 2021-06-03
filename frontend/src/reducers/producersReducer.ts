// Import components, functions, types, variables, and styles
import {
    FETCH_PRODUCERS_LIST_LOADING,
    FETCH_PRODUCERS_LIST_SUCCESS,
    FETCH_PRODUCERS_LIST_FAIL,
    TDispatchFetchProducersList
} from '../actions/fetchProducersList'
import { TProducers } from '../components/ProducersList'


// Types and interfaces
interface IFetchProducersListState {
    isLoading: boolean,
    data: TProducers | null,
    message: string | null
}


// Global variables
const initialState = {
    isLoading: false,
    data: null,
    message: null
}


// Reducer
export function producersReducer(state: IFetchProducersListState = initialState, action: TDispatchFetchProducersList) {
    switch (action.type) {
        case FETCH_PRODUCERS_LIST_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_PRODUCERS_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                message: null
            }
        case FETCH_PRODUCERS_LIST_FAIL:
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
