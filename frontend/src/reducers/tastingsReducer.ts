// Import components, functions, types, variables, and styles
import { ITastingsState } from './types'
import { TASTINGS_LOADING, TASTINGS_FAIL, TASTINGS_SUCCESS } from '../actions/tastingsActions'
import { TTastingsDispatch } from '../actions/types'


// Global variables
const defaultState = {
    isLoading: false
}


// Reducer
export function tastingsReducer(state: ITastingsState = defaultState, action: TTastingsDispatch) {
    switch (action.type) {
        case TASTINGS_FAIL:
            return {
                isLoading: false,
                error: action.payload
            }
        case TASTINGS_LOADING:
            return {
                isLoading: true
            }
        case TASTINGS_SUCCESS:
            return {
                isLoading: false,
                tastings: action.payload
            }
        default:
            return state
    }
}