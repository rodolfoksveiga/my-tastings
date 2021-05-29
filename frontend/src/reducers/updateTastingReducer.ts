// Import components, functions, types, variables, and styles
import {
    UPDATE_TASTING_SUCCESS,
    UPDATE_TASTING_FAIL,
    TDispatchUpdateTasting
} from '../actions/updateTasting'


// Types and interfaces
interface IUpdateTastingState {
    error: string | null
}


// Global variables
const initialState = {
    error: null
}


// Reducer
export function updateTastingReducer(state: IUpdateTastingState = initialState, action: TDispatchUpdateTasting) {
    switch (action.type) {
        case UPDATE_TASTING_SUCCESS:
            return {
                ...state
            }
        case UPDATE_TASTING_FAIL:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}
