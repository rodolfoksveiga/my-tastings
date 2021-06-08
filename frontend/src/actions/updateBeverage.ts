// Import components, functions, types, variables, and styles
import axios from 'axios'
import { Dispatch } from 'redux'

import { IBeverageForm } from '../components/CreateBeverage'


// Types and interfaces
interface IUpdateBeverageSuccess {
    type: typeof UPDATE_BEVERAGE_SUCCESS
}

interface IUpdateBeverageFail {
    type: typeof UPDATE_BEVERAGE_FAIL,
    payload: string
}

export type TDispatchUpdateBeverage = IUpdateBeverageSuccess | IUpdateBeverageFail


// Action types
const URL = 'http://localhost:8000/api/beverages/'
export const UPDATE_BEVERAGE_SUCCESS = 'UPDATE_BEVERAGE_SUCESS'
export const UPDATE_BEVERAGE_FAIL = 'UPDATE_BEVERAGE_FAIL'


// Action
export default function updateBeverage(access: string, id: string, body: IBeverageForm) {
    return async (dispatch: Dispatch<TDispatchUpdateBeverage>) => {
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
                type: UPDATE_BEVERAGE_SUCCESS
            })

        } catch (error) {
            dispatch({
                type: UPDATE_BEVERAGE_FAIL,
                payload: 'Error while updating the data. Check the input fields.'
            })

            console.log(error)
        }
    }
}
