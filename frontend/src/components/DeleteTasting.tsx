// Import components, functions, types, variables, and styles
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import DeleteOutlined from '@material-ui/icons/DeleteOutlined'

import deleteTasting from '../actions/deleteTasting'


// Types and interfaces
interface IDeleteTastingProps {
    id: string,
    updateTriggerReload: Function
    deleteTasting: Function
}


// Main component
export function DeleteTasting({ id, updateTriggerReload, deleteTasting }: IDeleteTastingProps) {
    function handleDelete() {
        if (window.confirm('Are you sure you want to delete this Tasting?')) {
            deleteTasting(id)
            updateTriggerReload()
        }
    }

    return (
        <IconButton onClick={handleDelete}>
            <DeleteOutlined />
        </IconButton>
    )
}



// Connect to Redux
export default connect(null, { deleteTasting })(DeleteTasting)
