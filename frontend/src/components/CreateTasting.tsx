// Import components, functions, types, variables, and styles
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined'

import FormikTasting from './FormikTasting'
import createTasting from '../actions/createTasting'
import { TRootState } from '../reducers/rootReducer'


// Types and interfaces
export interface ITastingForm {
    id?: string
    modified_at?: string
    name: string
    beverage: number
    color: string
    appearance: string
    aroma: string
    finish: string
    rating: number
    user: number
}

export interface ITastingFormFake {
    id?: string
    modified_at?: string
    name: string
    beverage?: number
    beverageName: string
    color: string
    appearance: string
    aroma: string
    finish: string
    rating: number
    user?: number
    userName?: string
}

interface ICreateTastingProps {
    isAuthenticated: boolean
    access: string | null
    createTasting: Function
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

const initialTastingForm: ITastingFormFake = {
    name: '',
    beverageName: '',
    color: '',
    appearance: '',
    aroma: '',
    finish: '',
    rating: 5
}


// Main component
export function CreateTasting({ isAuthenticated, access, createTasting }: ICreateTastingProps) {
    const classes = useStyles()
    const history = useHistory()

    function handleCreate(formData: ITastingForm, userId: number) {
        formData.user = userId
        createTasting(access, formData)
        history.push('/tastings/')
    }

    return (
        <div>
            <Typography className={classes.pageTitle} variant='h4' component='h4' align='center'>
                Create Tasting
            </Typography>
            <Grid
                container
                className={classes.parentGrid}
                direction='column'
                justify='flex-start'
                alignItems='center'
            >
                <Grid item>
                    <FormikTasting
                        initialFormData={initialTastingForm}
                        handleSubmit={handleCreate} 
                    />
                </Grid>
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
    access: state.authUser.access
})

export default connect(mapStateToProps, { createTasting })(CreateTasting)
