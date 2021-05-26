// Import components, functions, types, variables, and styles
import { ITasting, TTastings } from '../components/types'
import { TASTINGS_LOADING, TASTINGS_FAIL, TASTINGS_SUCCESS } from './tastingsActions'
import { TASTING_LOADING, TASTING_FAIL, TASTING_SUCCESS } from './tastingActions'


// Types and interfaces
interface ITastingsLoading {
    type: typeof TASTINGS_LOADING
}

interface ITastingsFail {
    type: typeof TASTINGS_FAIL,
    payload: string
}

interface ITastingsSuccess {
    type: typeof TASTINGS_SUCCESS,
    payload: TTastings
}

type TTastingsDispatch = ITastingsLoading | ITastingsFail | ITastingsSuccess

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
    TTastingsDispatch,
    TTastingDispatch
}