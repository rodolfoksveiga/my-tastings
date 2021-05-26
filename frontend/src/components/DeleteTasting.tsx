// Import components, functions, types, variables, and styles
import axios from 'axios'
import IconButton from '@material-ui/core/IconButton'
import DeleteOutlined from '@material-ui/icons/DeleteOutlined'

import { URL } from './Tastings'
import { IDeleteTastingProps } from '../types'


// Main component
export default function DeleteTasting({tasting, updateTriggerReload}: IDeleteTastingProps) {
    function handleDelete() {
        if (window.confirm('Are you sure you want to delete this Tasting?')) {
            axios
                .delete(URL + tasting.id + '/', { data: tasting })
                .then(() => {
                    alert('Tasting was deleted!')
                    updateTriggerReload()
                })
                .catch((error) => {
                    console.log(error)
                    alert('Error while deleting the Tasting.')
                })
        }
    }

    return (
        <IconButton onClick={handleDelete}>
            <DeleteOutlined />
        </IconButton>
    )
}
