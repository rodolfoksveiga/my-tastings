// Import components, functions, types, variables, and styles
import { rootReducer } from './rootReducer'
import { ITasting } from '../components/types'


// Types and interfaces
interface ITastingState {
    loading: boolean,
    tasting?: ITasting,
    error?: string
}

type TRoot = ReturnType<typeof rootReducer>


// Export
export type {
    ITastingState,
    TRoot
}