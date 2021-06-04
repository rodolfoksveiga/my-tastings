// Import components, functions, types, variables, and styles
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined'

import FormikBeverage from './FormikBeverage'
import createBeverage from '../actions/createBeverage'
import { TRootState } from '../reducers/rootReducer'


// Types and interfaces
export interface IBeverageForm {
    id?: number
    modified_at?: string
    name: string
    producer: number | null
    category: number | null
    user: number | null
    classification: string
    base: string
    year: string
    volume: number
    degree: string
    price: string
}

interface ICreateBeverageProps {
    isAuthenticated: boolean
    accessToken: string | null
    userId: number | null
    createBeverage: Function
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
export function CreateBeverage({ isAuthenticated, accessToken, userId, createBeverage }: ICreateBeverageProps) {
    const classes = useStyles()
    const history = useHistory()

    const initialBeverageForm: IBeverageForm = {
        name: '',
        producer: 0,
        category: 0,
        user: userId,
        classification: '',
        base: '',
        year: '',
        volume: 1000,
        degree: '',
        price: ''
    }

    function handleCreate(formData: IBeverageForm) {
        console.log(formData)
        createBeverage(accessToken, formData)
        history.push('/beverages/')
    }

    if (!isAuthenticated) {
        history.push('/login/')
    }

    return (
        <div>
            <Typography className={classes.pageTitle} variant='h4' component='h4' align='center'>
                Create Beverage
            </Typography>
            <Grid
                container
                className={classes.parentGrid}
                direction='column'
                justify='flex-start'
                alignItems='center'
            >
                <Grid item>
                    <FormikBeverage
                        initialFormData={initialBeverageForm}
                        handleSubmit={handleCreate} 
                    />
                </Grid>
                <Grid item>
                    <Button
                        className={classes.cancelButton}
                        variant='outlined'
                        href='/beverages/'
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
    userId: state.authUser.userId
})

export default connect(mapStateToProps, { createBeverage })(CreateBeverage)
