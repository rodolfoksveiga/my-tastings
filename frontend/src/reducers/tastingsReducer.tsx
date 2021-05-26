import { TTastingsState, ITastingsAction } from '../types'


// Reducer
export function tastingsReducer(state: TTastingsState = [], action: ITastingsAction) {
    switch (action.type) {
        case 'CREATE_TASTING':
            return {
                ...state,
                tastings: [
                    ...state,
                    action.payload
                ]
            }
        default:
            return state
    }
}