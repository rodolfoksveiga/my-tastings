// Import components, functions, types, variables, and styles
import axios from 'axios'
import { Dispatch } from 'redux'

// Types and interfaces
interface IDeleteBeverageSuccess {
    type: typeof DELETE_BEVERAGE_SUCCESS
}

interface IDeleteBeverageFail {
    type: typeof DELETE_BEVERAGE_FAIL
    payload: string
}

export type TDispatchDeleteBeverage =
    | IDeleteBeverageSuccess
    | IDeleteBeverageFail

// Action types
const URL = 'http://localhost:8000/api/beverages/'
export const DELETE_BEVERAGE_SUCCESS = 'DELETE_BEVERAGE_SUCESS'
export const DELETE_BEVERAGE_FAIL = 'DELETE_BEVERAGE_FAIL'

// Action
export default function deleteBeverage(access: string | null, id: string) {
    return async (dispatch: Dispatch<TDispatchDeleteBeverage>) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + access,
                },
            }

            await axios.delete(URL + id + '/', config)

            dispatch({
                type: DELETE_BEVERAGE_SUCCESS,
            })

            alert('The Beverage was deleted!')
        } catch (error) {
            dispatch({
                type: DELETE_BEVERAGE_FAIL,
                payload: 'Error while deleting the data. Try again.',
            })

            console.log(error)
        }
    }
}
