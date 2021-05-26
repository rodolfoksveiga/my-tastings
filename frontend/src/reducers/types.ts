// Import components, functions, types, variables, and styles
import { rootReducer } from './rootReducer'
import { ITasting, TTastings } from '../components/types'


// Types and interfaces
type TRootState = ReturnType<typeof rootReducer>

interface ITastingsState {
    isLoading: boolean,
    tastings?: TTastings,
    error?: string
}

interface ITastingState {
    isLoading: boolean,
    tasting?: ITasting,
    error?: string
}


// Export
export type {
    TRootState,
    ITastingsState,
    ITastingState
}