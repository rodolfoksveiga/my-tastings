// Import components, functions, types, variables, and styles
import { combineReducers } from 'redux'

import { tastingReducer } from './tastingReducer'


// Reducer
export const rootReducer = combineReducers({
    tasting: tastingReducer
})
