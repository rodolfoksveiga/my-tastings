// Import components, functions, types, variables, and styles
import axios from 'axios'
import { Dispatch } from 'redux'


// Types and interfaces
interface IDeleteTastingSuccess {
    type: typeof DELETE_TASTING_SUCCESS,
    payload: string
}

interface IDeleteTastingFail {
    type: typeof DELETE_TASTING_FAIL,
    payload: string
}

export type TDispatchDeleteTasting = IDeleteTastingSuccess | IDeleteTastingFail


// Action types
const URL = 'http://localhost:8000/api/tastings/'
export const DELETE_TASTING_SUCCESS = 'DELETE_TASTING_SUCESS'
export const DELETE_TASTING_FAIL = 'DELETE_TASTING_FAIL'


// Action
export default function deleteTasting(id: string) {
    return async (dispatch: Dispatch<TDispatchDeleteTasting>) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('access')
                }
            }

            await axios.delete(URL + id + '/', config)

            dispatch({
                type: DELETE_TASTING_SUCCESS,
                payload: id
            })

            alert('The data was deleted!')

        } catch (error) {
            dispatch({
                type: DELETE_TASTING_FAIL,
                payload: 'Error while deleting the data. Try again.'
            })

            console.log(error)
        }
    }
}
