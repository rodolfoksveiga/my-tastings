// Import components, functions, types, variables, and styles
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { rootReducer } from './reducers/rootReducer'


// Store
export const store = createStore(rootReducer, applyMiddleware(thunk))
