// Import components, functions, types, variables, and styles
import { combineReducers } from 'redux'

import { authUserReducer } from './authUserReducer'
import { fetchTastingsListReducer } from './fetchTastingsListReducer'
import { fetchTastingDetailsReducer } from './fetchTastingDetailsReducer'
import { createTastingReducer } from './createTastingReducer'
import { deleteTastingReducer } from './deleteTastingReducer'
import { updateTastingReducer } from './updateTastingReducer'


// Types and interfaces
export type TRootState = ReturnType<typeof rootReducer>


// Reducer
export const rootReducer = combineReducers({
    authUser: authUserReducer,
    fetchTastingsList: fetchTastingsListReducer,
    fetchTastingDetails: fetchTastingDetailsReducer,
    createTasting: createTastingReducer,
    deleteTasting: deleteTastingReducer,
    updateTasting: updateTastingReducer
})
