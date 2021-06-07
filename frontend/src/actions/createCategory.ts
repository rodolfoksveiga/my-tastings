// Import components, functions, types, variables, and styles
import axios from 'axios'
import { Dispatch } from 'redux'

import { ICategory } from '../components/CategoriesList'
import { ICategoryForm } from '../components/CreateCategory'


// Types and interfaces
interface ICreateCategorySuccess {
    type: typeof CREATE_CATEGORY_SUCCESS,
    payload: ICategory
}

interface ICreateCategoryFail {
    type: typeof CREATE_CATEGORY_FAIL,
    payload: string
}

export type TDispatchCreateCategory = ICreateCategorySuccess | ICreateCategoryFail


// Action types
const URL = 'http://localhost:8000/api/categories/'
export const CREATE_CATEGORY_SUCCESS = 'CREATE_CATEGORY_SUCESS'
export const CREATE_CATEGORY_FAIL = 'CREATE_CATEGORY_FAIL'


// Action
export default function createCategory(access: string | null, body: ICategoryForm) {
    return async (dispatch: Dispatch<TDispatchCreateCategory>) => {
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
                type: CREATE_CATEGORY_SUCCESS,
                payload: response.data
            })

        } catch (error) {
            dispatch({
                type: CREATE_CATEGORY_FAIL,
                payload: 'Error while creating the data. Check the input fields.'
            })

            console.log(error)
        }
    }
}
