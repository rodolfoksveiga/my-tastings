// Import components, functions, types, variables, and styles
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import DeleteOutlined from '@material-ui/icons/DeleteOutlined'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import deleteTasting from '../actions/deleteTasting'
import { TRootState } from '../reducers/rootReducer'


// Types and interfaces
interface IDeleteTastingProps {
    accessToken: string | null
    id: number
    updateTriggerReload: Function
    deleteTasting: Function
}


// Global variables
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        deleteIcon: {
            '&:hover': {
                color: theme.palette.error.main
            }
        }
    })
)


// Main component
export function DeleteTasting({ accessToken, id, updateTriggerReload, deleteTasting }: IDeleteTastingProps) {
    const classes = useStyles()
    
    function handleDelete() {
        if (window.confirm('Are you sure you want to delete this Tasting?')) {
            deleteTasting(accessToken, id)
            updateTriggerReload()
        }
    }

    return (
        <IconButton className={classes.deleteIcon} onClick={handleDelete}>
            <DeleteOutlined />
        </IconButton>
    )
}



// Connect to Redux
const mapStateToProps = (state: TRootState) => ({
    accessToken: state.authUser.accessToken
})

export default connect(mapStateToProps, { deleteTasting })(DeleteTasting)
