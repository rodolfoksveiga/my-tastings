// Import components, functions, types, variables, and styles
import { combineReducers } from 'redux'

import { fetchTastingsListReducer } from './fetchTastingsListReducer'
import { fetchTastingDetailsReducer } from './fetchTastingDetailsReducer'
import { createTastingReducer } from './createTastingReducer'
import { deleteTastingReducer } from './deleteTastingReducer'
import { updateTastingReducer } from './updateTastingReducer'


// Types and interfaces
export type TRootState = ReturnType<typeof rootReducer>


// Global variables
export const initialState = {
    isLoading: false
}


// Reducer
export const rootReducer = combineReducers({
    fetchTastingsList: fetchTastingsListReducer,
    fetchTastingDetails: fetchTastingDetailsReducer,
    createTasting: createTastingReducer,
    deleteTasting: deleteTastingReducer,
    updateTasting: updateTastingReducer
})
