// Import components, functions, types, variables, and styles
import { initialState } from './rootReducer'
import {
    UPDATE_TASTING_PROCESSING,
    UPDATE_TASTING_SUCCESS,
    UPDATE_TASTING_FAIL,
    TDispatchUpdateTasting
} from '../actions/updateTasting'


// Types and interfaces
interface IUpdateTastingState {
    isLoading: boolean
    error?: string
}


// Reducer
export function updateTastingReducer(state: IUpdateTastingState = initialState, action: TDispatchUpdateTasting) {
    switch (action.type) {
        case UPDATE_TASTING_PROCESSING:
            return {
                ...state,
                isLoading: true
            }
        case UPDATE_TASTING_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case UPDATE_TASTING_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state
    }
}