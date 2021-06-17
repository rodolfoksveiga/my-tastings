// Import components, functions, types, variables, and styles
import axios from 'axios'
import { Dispatch } from 'redux'

// Types and interfaces
interface IDeleteCategorySuccess {
    type: typeof DELETE_CATEGORY_SUCCESS
}

interface IDeleteCategoryFail {
    type: typeof DELETE_CATEGORY_FAIL
    payload: string
}

export type TDispatchDeleteCategory =
    | IDeleteCategorySuccess
    | IDeleteCategoryFail

// Action types
const URL = 'http://localhost:8000/api/categories/'
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCESS'
export const DELETE_CATEGORY_FAIL = 'DELETE_CATEGORY_FAIL'

// Action
export default function deleteCategory(access: string | null, id: string) {
    return async (dispatch: Dispatch<TDispatchDeleteCategory>) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + access,
                },
            }

            await axios.delete(URL + id + '/', config)

            dispatch({
                type: DELETE_CATEGORY_SUCCESS,
            })

            alert('The Category was deleted!')
        } catch (error) {
            dispatch({
                type: DELETE_CATEGORY_FAIL,
                payload: 'Error while deleting the data. Try again.',
            })

            console.log(error)
        }
    }
}
