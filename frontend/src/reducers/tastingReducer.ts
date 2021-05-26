// Import components, functions, types, variables, and styles
import { ITastingState } from './types'
import { TASTING_LOADING, TASTING_FAIL, TASTING_SUCCESS } from '../requests/ACTIONS'
import { TTastingDispatch } from '../requests/types'


// Global variables
const defaultState = {
    loading: false
}


// Reducer
export function tastingReducer(state: ITastingState = defaultState, action: TTastingDispatch) {
    switch (action.type) {
        case TASTING_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case TASTING_LOADING:
            return {
                loading: true
            }
        case TASTING_SUCCESS:
            return {
                loading: false,
                tasting: action.payload
            }
        default:
            return state
    }
}