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
import { IBeverage } from './BeveragesList'
import { TRootState } from '../reducers/rootReducer'


// Types and interfaces
export interface ITastingForm {
    id?: number
    modified_at?: string
    name: string
    beverage: number | IBeverage | null
    user: number | null
    color: string
    appearance: string
    aroma: string
    finish: string
    rating: number
}

interface ICreateTastingProps {
    isAuthenticated: boolean
    accessToken: string | null
    userId: number | null
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


function isIBeverage(obj: any): obj is IBeverage {
    return obj.foo !== undefined 
  }



// Main component
export function CreateTasting({ isAuthenticated, accessToken, userId, createTasting }: ICreateTastingProps) {
    const classes = useStyles()
    const history = useHistory()

    const initialTastingForm: ITastingForm = {
        name: '',
        beverage: null,
        user: userId,
        color: '',
        appearance: '',
        aroma: '',
        finish: '',
        rating: 5
    }

    function handleCreate(formData: ITastingForm) {
        console.log(formData)
        if (isIBeverage(formData.beverage)) {
            console.log('IGUAL!')
            formData.beverage = formData.beverage.id
        }
        console.log(formData)
        createTasting(accessToken, formData)
        history.push('/tastings/')
    }

    if (!isAuthenticated) {
        history.push('/login/')
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
    accessToken: state.authUser.accessToken,
    userId: state.authUser.userId
})

export default connect(mapStateToProps, { createTasting })(CreateTasting)
