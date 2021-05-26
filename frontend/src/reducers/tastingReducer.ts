// Import components, functions, types, variables, and styles
import { ITastingState } from './types'
import { TASTING_LOADING, TASTING_FAIL, TASTING_SUCCESS } from '../actions/tastingActions'
import { TTastingDispatch } from '../actions/types'


// Global variables
const defaultState = {
    isLoading: false
}


// Reducer
export function tastingReducer(state: ITastingState = defaultState, action: TTastingDispatch) {
    switch (action.type) {
        case TASTING_FAIL:
            return {
                isLoading: false,
                error: action.payload
            }
        case TASTING_LOADING:
            return {
                isLoading: true
            }
        case TASTING_SUCCESS:
            return {
                isLoading: false,
                tasting: action.payload
            }
        default:
            return state
    }
}