// Import components, functions, types, variables, and styles
import {
    DELETE_TASTING_SUCCESS,
    DELETE_TASTING_FAIL,
    TDispatchDeleteTasting
} from '../actions/deleteTasting'


// Types and interfaces
interface IDeleteTastingState {
    error: string | null
}


// Global variables
const initialState = {
    error: null
}


// Reducer
export function deleteTastingReducer(state: IDeleteTastingState = initialState, action: TDispatchDeleteTasting) {
    switch (action.type) {
        case DELETE_TASTING_SUCCESS:
            return {
                ...state
            }
        case DELETE_TASTING_FAIL:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}
