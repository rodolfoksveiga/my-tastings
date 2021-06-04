// Import components, functions, types, variables, and styles
import axios from 'axios'
import { Dispatch } from 'redux'

import { IBeverage } from '../components/BeveragesList'
import { IBeverageForm } from '../components/CreateBeverage'


// Types and interfaces
interface ICreateBeverageSuccess {
    type: typeof CREATE_BEVERAGE_SUCCESS,
    payload: IBeverage
}

interface ICreateBeverageFail {
    type: typeof CREATE_BEVERAGE_FAIL,
    payload: string
}

export type TDispatchCreateBeverage = ICreateBeverageSuccess | ICreateBeverageFail


// Action types
const URL = 'http://localhost:8000/api/beverages/'
export const CREATE_BEVERAGE_SUCCESS = 'CREATE_BEVERAGE_SUCESS'
export const CREATE_BEVERAGE_FAIL = 'CREATE_BEVERAGE_FAIL'


// Action
export default function createBeverage(access: string | null, body: IBeverageForm) {
    return async (dispatch: Dispatch<TDispatchCreateBeverage>) => {
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
                type: CREATE_BEVERAGE_SUCCESS,
                payload: response.data
            })

        } catch (error) {
            dispatch({
                type: CREATE_BEVERAGE_FAIL,
                payload: 'Error while creating the data. Check the input fields.'
            })

            console.log(error)
        }
    }
}
