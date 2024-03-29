// Import components, functions, types, variables, and styles
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import DeleteOutlined from '@material-ui/icons/DeleteOutlined'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import deleteBeverage from '../actions/deleteBeverage'
import { TRootState } from '../reducers/rootReducer'

// Types and interfaces
interface IDeleteBeverageProps {
    accessToken: string | null
    id: number
    updateTriggerReload: Function
    deleteBeverage: Function
}

// Global variables
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        deleteIcon: {
            '&:hover': {
                color: theme.palette.error.main,
            },
        },
    })
)

// Main component
export function DeleteBeverage({
    accessToken,
    id,
    updateTriggerReload,
    deleteBeverage,
}: IDeleteBeverageProps) {
    const classes = useStyles()

    function handleDelete() {
        if (window.confirm('Are you sure you want to delete this Beverage?')) {
            deleteBeverage(accessToken, id)
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
    accessToken: state.authUser.accessToken,
})

export default connect(mapStateToProps, { deleteBeverage })(DeleteBeverage)
