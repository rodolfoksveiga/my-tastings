// Import components, functions, types, variables, and styles
import {
    CREATE_TASTING_SUCCESS,
    CREATE_TASTING_FAIL,
    TDispatchCreateTasting
} from '../actions/createTasting'
import { ITasting } from '../components/types'


// Types and interfaces
interface ICreateTastingState {
    tasting: ITasting | null
    error: string | null
}


// Global variables
const initialState = {
    tasting: null,
    error: null
}


// Reducer
export function createTastingReducer(state: ICreateTastingState = initialState, action: TDispatchCreateTasting) {
    switch (action.type) {
        case CREATE_TASTING_SUCCESS:
            return {
                ...state,
                tasting: action.payload
            }
        case CREATE_TASTING_FAIL:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}
