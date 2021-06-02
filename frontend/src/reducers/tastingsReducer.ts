// Import components, functions, types, variables, and styles
import {
    FETCH_TASTINGS_LIST_LOADING,
    FETCH_TASTINGS_LIST_SUCCESS,
    FETCH_TASTINGS_LIST_FAIL,
    TDispatchFetchTastingsList
} from '../actions/fetchTastingsList'
import {
    CREATE_TASTING_SUCCESS,
    CREATE_TASTING_FAIL,
    TDispatchCreateTasting
} from '../actions/createTasting'
import {
    UPDATE_TASTING_SUCCESS,
    UPDATE_TASTING_FAIL,
    TDispatchUpdateTasting
} from '../actions/updateTasting'
import {
    DELETE_TASTING_SUCCESS,
    DELETE_TASTING_FAIL,
    TDispatchDeleteTasting
} from '../actions/deleteTasting'
import { TTastings } from '../components/TastingsList'


// Types and interfaces
type TDispatchTasting = TDispatchFetchTastingsList | TDispatchCreateTasting | TDispatchUpdateTasting | TDispatchDeleteTasting

interface ITastingsState {
    isLoading: boolean
    data: TTastings | null
    message: string | null
}


// Global variables
const initialState = {
    isLoading: false,
    data: null,
    message: null
}


// Reducer
export function tastingsReducer(state: ITastingsState = initialState, action: TDispatchTasting) {
    switch (action.type) {
        case FETCH_TASTINGS_LIST_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_TASTINGS_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload.data,
                message: null
            }
        case FETCH_TASTINGS_LIST_FAIL:
            return {
                ...state,
                isLoading: false,
                data: null,
                message: action.payload
            }
        case CREATE_TASTING_SUCCESS:
            return {
                ...state,
                message: null
            }
        case CREATE_TASTING_FAIL:
            return {
                ...state,
                message: action.payload
            }
        case UPDATE_TASTING_SUCCESS:
            return {
                ...state,
                message: null
            }
        case UPDATE_TASTING_FAIL:
            return {
                ...state,
                message: action.payload
            }
        case DELETE_TASTING_SUCCESS:
            return {
                ...state,
                message: null
            }
        case DELETE_TASTING_FAIL:
            return {
                ...state,
                message: action.payload
            }
        default:
            return state
    }
}
