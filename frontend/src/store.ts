// Import components, functions, types, variables, and styles
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { rootReducer } from './reducers/rootReducer'


// Store
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
