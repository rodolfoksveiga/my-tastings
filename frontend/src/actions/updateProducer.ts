// Import components, functions, types, variables, and styles
import axios from 'axios'
import { Dispatch } from 'redux'

import { IProducerForm } from '../components/CreateProducer'


// Types and interfaces
interface IUpdateProducerSuccess {
    type: typeof UPDATE_PRODUCER_SUCCESS
}

interface IUpdateProducerFail {
    type: typeof UPDATE_PRODUCER_FAIL,
    payload: string
}

export type TDispatchUpdateProducer = IUpdateProducerSuccess | IUpdateProducerFail


// Action types
const URL = 'http://localhost:8000/api/producers/'
export const UPDATE_PRODUCER_SUCCESS = 'UPDATE_PRODUCER_SUCESS'
export const UPDATE_PRODUCER_FAIL = 'UPDATE_PRODUCER_FAIL'


// Action
export default function updateProducer(access: string, id: string, body: IProducerForm) {
    return async (dispatch: Dispatch<TDispatchUpdateProducer>) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access,
                'Accept': 'application/json'
            }
        }

        try {
            await axios.put(URL + id + '/', body, config)

            dispatch({
                type: UPDATE_PRODUCER_SUCCESS
            })

        } catch (error) {
            dispatch({
                type: UPDATE_PRODUCER_FAIL,
                payload: 'Error while updating the data. Check the input fields.'
            })

            console.log(error)
        }
    }
}
