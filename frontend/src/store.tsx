// Import components, functions, types, variables, and styles
import { createStore } from 'redux'
import { tastingsReducer } from './reducers/tastingsReducer'


// Store
export const store = createStore(tastingsReducer)