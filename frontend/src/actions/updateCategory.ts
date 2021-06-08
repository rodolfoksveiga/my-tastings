// Import components, functions, types, variables, and styles
import axios from 'axios'
import { Dispatch } from 'redux'

import { ICategoryForm } from '../components/CreateCategory'


// Types and interfaces
interface IUpdateCategorySuccess {
    type: typeof UPDATE_CATEGORY_SUCCESS
}

interface IUpdateCategoryFail {
    type: typeof UPDATE_CATEGORY_FAIL,
    payload: string
}

export type TDispatchUpdateCategory = IUpdateCategorySuccess | IUpdateCategoryFail


// Action types
const URL = 'http://localhost:8000/api/categories/'
export const UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCESS'
export const UPDATE_CATEGORY_FAIL = 'UPDATE_CATEGORY_FAIL'


// Action
export default function updateCategory(access: string, id: string, body: ICategoryForm) {
    return async (dispatch: Dispatch<TDispatchUpdateCategory>) => {
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
                type: UPDATE_CATEGORY_SUCCESS
            })

        } catch (error) {
            dispatch({
                type: UPDATE_CATEGORY_FAIL,
                payload: 'Error while updating the data. Check the input fields.'
            })

            console.log(error)
        }
    }
}
