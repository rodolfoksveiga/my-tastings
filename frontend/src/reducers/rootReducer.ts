// Import components, functions, types, variables, and styles
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { authUserReducer } from './authUserReducer'
import { tastingsReducer } from './tastingsReducer'
import { beveragesReducer } from './beveragesReducer'
import { categoriesReducer } from './categoriesReducer'
import { producersReducer } from './producersReducer'
import { tagsReducer } from './tagsReducer'


// Types and interfaces
export type TRootState = ReturnType<typeof rootReducer>


// Reducer
const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    authUser: authUserReducer,
    tastings: tastingsReducer,
    beverages: beveragesReducer,
    categories: categoriesReducer,
    producers: producersReducer,
    tags: tagsReducer
})

export const persistedReducer = persistReducer(persistConfig, rootReducer)
