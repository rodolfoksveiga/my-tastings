// Import components, functions, types, variables, and styles
import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { persistedReducer } from './reducers/rootReducer'


// Store
export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))

export const persistor = persistStore(store)
