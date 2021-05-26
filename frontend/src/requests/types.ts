// Import components, functions, types, variables, and styles
import { ITasting } from '../components/types'
import { TASTING_LOADING, TASTING_FAIL, TASTING_SUCCESS } from './ACTIONS'


// Types and interfaces
interface ITastingLoading {
    type: typeof TASTING_LOADING
}

interface ITastingFail {
    type: typeof TASTING_FAIL,
    payload: string
}

interface ITastingSuccess {
    type: typeof TASTING_SUCCESS,
    payload: ITasting
}

type TTastingDispatch = ITastingLoading | ITastingFail | ITastingSuccess


// Export
export type {
    ITastingLoading,
    ITastingFail,
    ITastingSuccess,
    TTastingDispatch
}