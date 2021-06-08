// Import components, functions, types, variables, and styles
import { connect } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined'

import FormikBeverage from './FormikBeverage'
import updateBeverage from '../actions/updateBeverage'
import { TBeverages } from './BeveragesList'
import { TRootState } from '../reducers/rootReducer'
import { IBeverageParams } from './BeverageDetails'
import { IBeverageForm } from './CreateBeverage'

// Types and interfaces
interface IUpdateBeverageProps {
    isAuthenticated: boolean
    accessToken: string | null
    beverages: TBeverages | null
    message: string | null
    updateBeverage: Function
}

// Global variables
const useStyles = makeStyles((theme) => ({
    parentGrid: {
        padding: theme.spacing(2),
    },
    pageTitle: {
        margin: theme.spacing(2),
    },
    cancelButton: {
        marginTop: theme.spacing(3),
        color: theme.palette.common.black,
        '&:hover': {
            color: theme.palette.error.main,
            borderColor: theme.palette.error.main,
        },
    },
}))

// Main component
export function UpdateBeverage({
    isAuthenticated,
    accessToken,
    beverages,
    updateBeverage,
}: IUpdateBeverageProps) {
    const classes = useStyles()
    const { id } = useParams<IBeverageParams>()
    const history = useHistory()

    let beverage = null
    if (beverages) {
        beverage = beverages.find((item) => String(item.id) === id)
    }

    function handleUpdate(form: IBeverageForm) {
        updateBeverage(accessToken, id, form)
        history.push('/beverages/' + id + '/')
    }

    if (!isAuthenticated) {
        history.push('/login/')
    }

    return (
        <div>
            <Typography
                className={classes.pageTitle}
                variant="h4"
                component="h4"
                align="center"
            >
                Update Beverage
            </Typography>
            <Grid
                container
                className={classes.parentGrid}
                direction="column"
                justify="flex-start"
                alignItems="center"
            >
                {beverage && (
                    <FormikBeverage
                        initialFormData={beverage}
                        handleSubmit={handleUpdate}
                    />
                )}
                <Grid item>
                    <Button
                        className={classes.cancelButton}
                        variant="outlined"
                        href="/beverages/"
                        startIcon={<ArrowBackOutlinedIcon />}
                        fullWidth
                    >
                        Back to Beverages List
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

// Connect to Redux
const mapStateToProps = (state: TRootState) => ({
    isAuthenticated: state.authUser.isAuthenticated,
    accessToken: state.authUser.accessToken,
    beverages: state.beverages.data,
})

export default connect(mapStateToProps, { updateBeverage })(UpdateBeverage)
