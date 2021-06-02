// Import components, functions, types, variables, and styles
import { connect } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined'

import FormikTasting from './FormikTasting'
import updateTasting from '../actions/updateTasting'
import { TTastings } from './TastingsList'
import { TRootState } from '../reducers/rootReducer'
import { ITastingParams } from './TastingDetails'
import { ITastingForm } from './CreateTasting'
import fetchTastingsList from '../actions/fetchTastingsList'


// Types and interfaces
interface IUpdateTastingProps {
    isAuthenticated: boolean
    access: string | null
    tastings: TTastings | null
    message: string | null
    fetchTastingsList: Function
    updateTasting: Function
}


// Global variables
const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(5),
        spacing: theme.spacing(3)
    }
}))


// Main component
export function UpdateTasting({ isAuthenticated, access, tastings, fetchTastingsList, updateTasting }: IUpdateTastingProps) {
    const classes = useStyles()
    const { id } = useParams<ITastingParams>()
    const history = useHistory()

    let tasting = null
    if (tastings) {
        tasting = tastings.find(item => String(item.id) === id)
    }

    function handleUpdate(form: ITastingForm) {
        updateTasting(access, id, form)
        history.push('/tastings/' + id + '/')
    }

    return (
        <div>
            <Typography variant='h4' component='h4' align='center'>
                Update Tasting
            </Typography>
            <Grid
                container
                className={classes.container}
                direction='column'
                justify='flex-start'
                alignItems='center'
            >
                    
                {tasting && (
                    <FormikTasting
                        initialFormData={tasting}
                        handleSubmit={handleUpdate} 
                    />
                )}
                <Grid item>
                    <Button
                        variant='outlined'
                        href='/tastings/'
                        startIcon={<ArrowBackOutlinedIcon />}
                        fullWidth
                    >
                        Back to Tastings List
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}


// Connect to Redux
const mapStateToProps = (state: TRootState) => ({
    isAuthenticated: state.authUser.isAuthenticated,
    access: state.authUser.access,
    tastings: state.tastings.data
})

export default connect(mapStateToProps, { fetchTastingsList, updateTasting })(UpdateTasting)
