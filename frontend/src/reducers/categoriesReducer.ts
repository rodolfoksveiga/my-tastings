// Import components, functions, types, variables, and styles
import {
    FETCH_CATEGORIES_LIST_LOADING,
    FETCH_CATEGORIES_LIST_SUCCESS,
    FETCH_CATEGORIES_LIST_FAIL,
    TDispatchFetchCategoriesList
} from '../actions/fetchCategoriesList'
import { TCategories } from '../components/CategoriesList'


// Types and interfaces
interface IFetchCategoriesListState {
    isLoading: boolean,
    data: TCategories | null,
    message: string | null
}


// Global variables
const initialState = {
    isLoading: false,
    data: null,
    message: null
}


// Reducer
export function categoriesReducer(state: IFetchCategoriesListState = initialState, action: TDispatchFetchCategoriesList) {
    switch (action.type) {
        case FETCH_CATEGORIES_LIST_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_CATEGORIES_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                message: null
            }
        case FETCH_CATEGORIES_LIST_FAIL:
            return {
                ...state,
                isLoading: false,
                data: null,
                message: action.payload
            }
        default:
            return state
    }
}
