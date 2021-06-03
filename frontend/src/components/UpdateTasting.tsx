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


// Types and interfaces
interface IUpdateTastingProps {
    isAuthenticated: boolean
    accessToken: string | null
    tastings: TTastings | null
    message: string | null
    updateTasting: Function
}


// Global variables
const useStyles = makeStyles(theme => ({
    parentGrid: {
        padding: theme.spacing(2),
    },
    pageTitle: {
        margin: theme.spacing(2)
    },
    cancelButton: {
        marginTop: theme.spacing(3),
        color: theme.palette.common.black,
        '&:hover': {
            color: theme.palette.error.main,
            borderColor: theme.palette.error.main
        }
    }
}))


// Main component
export function UpdateTasting({ isAuthenticated, accessToken, tastings, updateTasting }: IUpdateTastingProps) {
    const classes = useStyles()
    const { id } = useParams<ITastingParams>()
    const history = useHistory()

    let tasting = null
    if (tastings) {
        tasting = tastings.find(item => String(item.id) === id)
    }

    function handleUpdate(form: ITastingForm) {
        updateTasting(accessToken, id, form)
        history.push('/tastings/' + id + '/')
    }

    if (!isAuthenticated) {
        history.push('/login/')
    }

    return (
        <div>
            <Typography className={classes.pageTitle} variant='h4' component='h4' align='center'>
                Update Tasting
            </Typography>
            <Grid
                container
                className={classes.parentGrid}
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
                        className={classes.cancelButton}
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
    accessToken: state.authUser.accessToken,
    tastings: state.tastings.data
})

export default connect(mapStateToProps, { updateTasting })(UpdateTasting)
