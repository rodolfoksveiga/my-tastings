// Import components, functions, types, variables, and styles
import { combineReducers } from 'redux'

import { tastingReducer } from './tastingReducer'
import { tastingsReducer } from './tastingsReducer'


// Reducer
export const rootReducer = combineReducers({
    tastings: tastingsReducer,
    tasting: tastingReducer
})
