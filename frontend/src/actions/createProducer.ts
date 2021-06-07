// Import components, functions, types, variables, and styles
import axios from 'axios'
import { Dispatch } from 'redux'

import { IProducer } from '../components/ProducersList'
import { IProducerForm } from '../components/CreateProducer'


// Types and interfaces
interface ICreateProducerSuccess {
    type: typeof CREATE_PRODUCER_SUCCESS,
    payload: IProducer
}

interface ICreateProducerFail {
    type: typeof CREATE_PRODUCER_FAIL,
    payload: string
}

export type TDispatchCreateProducer = ICreateProducerSuccess | ICreateProducerFail


// Action types
const URL = 'http://localhost:8000/api/producers/'
export const CREATE_PRODUCER_SUCCESS = 'CREATE_PRODUCER_SUCESS'
export const CREATE_PRODUCER_FAIL = 'CREATE_PRODUCER_FAIL'


// Action
export default function createProducer(access: string | null, body: IProducerForm) {
    return async (dispatch: Dispatch<TDispatchCreateProducer>) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + access,
                    'Accept': 'application/json'
                }
            }

            const response = await axios.post(URL, body, config)

            dispatch({
                type: CREATE_PRODUCER_SUCCESS,
                payload: response.data
            })

        } catch (error) {
            dispatch({
                type: CREATE_PRODUCER_FAIL,
                payload: 'Error while creating the data. Check the input fields.'
            })

            console.log(error)
        }
    }
}
