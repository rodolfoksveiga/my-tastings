// Import components, functions, types, variables, and styles
import { useSelector, useDispatch } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import DeleteOutlined from '@material-ui/icons/DeleteOutlined'

import deleteTasting from '../actions/deleteTasting'
import { TId } from './types'
import { TRootState } from '../reducers/rootReducer'


// Types and interfaces
interface IDeleteTastingProps {
    id: TId,
    updateTriggerReload: Function
}


// Main component
export default function DeleteTasting({id, updateTriggerReload}: IDeleteTastingProps) {
    const state = useSelector((state: TRootState) => state.deleteTasting)
    const dispatch = useDispatch()

    function handleDelete() {
        if (window.confirm('Are you sure you want to delete this Tasting?')) {
            dispatch(deleteTasting(id))
            updateTriggerReload()
        }
    }

    return (
        <IconButton onClick={handleDelete}>
            <DeleteOutlined />
        </IconButton>
    )
}
