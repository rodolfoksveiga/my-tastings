// Import components, functions, types, variables, and styles
import { combineReducers } from 'redux'

import { authUserReducer } from './authUserReducer'
import { tastingsReducer } from './tastingsReducer'
import { beveragesReducer } from './beveragesReducer'


// Types and interfaces
export type TRootState = ReturnType<typeof rootReducer>


// Reducer
export const rootReducer = combineReducers({
    authUser: authUserReducer,
    tastings: tastingsReducer,
    beverages: beveragesReducer
})
