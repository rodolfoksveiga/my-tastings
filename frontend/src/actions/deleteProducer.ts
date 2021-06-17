// Import components, functions, types, variables, and styles
import axios from 'axios'
import { Dispatch } from 'redux'

// Types and interfaces
interface IDeleteProducerSuccess {
    type: typeof DELETE_PRODUCER_SUCCESS
}

interface IDeleteProducerFail {
    type: typeof DELETE_PRODUCER_FAIL
    payload: string
}

export type TDispatchDeleteProducer =
    | IDeleteProducerSuccess
    | IDeleteProducerFail

// Action types
const URL = 'http://localhost:8000/api/producers/'
export const DELETE_PRODUCER_SUCCESS = 'DELETE_PRODUCER_SUCESS'
export const DELETE_PRODUCER_FAIL = 'DELETE_PRODUCER_FAIL'

// Action
export default function deleteProducer(access: string | null, id: string) {
    return async (dispatch: Dispatch<TDispatchDeleteProducer>) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + access,
                },
            }

            await axios.delete(URL + id + '/', config)

            dispatch({
                type: DELETE_PRODUCER_SUCCESS,
            })

            alert('The Producer was deleted!')
        } catch (error) {
            dispatch({
                type: DELETE_PRODUCER_FAIL,
                payload: 'Error while deleting the data. Try again.',
            })

            console.log(error)
        }
    }
}
