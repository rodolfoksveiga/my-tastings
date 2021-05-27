// Import components, functions, types, variables, and styles
import { initialState } from './rootReducer'
import {
    CREATE_TASTING_PROCESSING,
    CREATE_TASTING_SUCCESS,
    CREATE_TASTING_FAIL,
    TDispatchCreateTasting
} from '../actions/createTasting'
import { ITasting } from '../components/types'


// Types and interfaces
interface ICreateTastingState {
    isLoading: boolean,
    tasting?: ITasting
    error?: string
}


// Reducer
export function createTastingReducer(state: ICreateTastingState = initialState, action: TDispatchCreateTasting) {
    switch (action.type) {
        case CREATE_TASTING_PROCESSING:
            return {
                ...state,
                isLoading: true
            }
        case CREATE_TASTING_SUCCESS:
            return {
                ...state,
                isLoading: false,
                tasting: action.payload
            }
        case CREATE_TASTING_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state
    }
}