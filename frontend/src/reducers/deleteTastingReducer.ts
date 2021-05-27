// Import components, functions, types, variables, and styles
import { initialState } from './rootReducer'
import {
    DELETE_TASTING_PROCESSING,
    DELETE_TASTING_SUCCESS,
    DELETE_TASTING_FAIL,
    TDispatchDeleteTasting
} from '../actions/deleteTasting'


// Types and interfaces
interface IDeleteTastingState {
    isLoading: boolean,
    error?: string
}


// Reducer
export function deleteTastingReducer(state: IDeleteTastingState = initialState, action: TDispatchDeleteTasting) {
    switch (action.type) {
        case DELETE_TASTING_PROCESSING:
            return {
                ...state,
                isLoading: true
            }
        case DELETE_TASTING_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case DELETE_TASTING_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state
    }
}