// Import components, functions, types, variables, and styles
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import 'fontsource-roboto'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined'

import { createTasting } from '../actions/createTasting'
import { TRootState } from '../reducers/rootReducer'
import FormikTasting from './FormikTasting'
import { THistory, ITastingForm } from './types'


// Global variables
const initialTastingForm: ITastingForm = {
    name: '',
    beverage: null,
    user: null,
    color: '',
    appearance: '',
    aroma: '',
    finish: '',
    rating: null
}


// Main component
export default function CreateTasting() {
    const history = useHistory<THistory>()
    const state = useSelector((state: TRootState) => state.createTasting)
    const dispatch = useDispatch()

    function handleCreate(form: ITastingForm) {
        dispatch(createTasting(form))
        history.push('/tastings/')
    }

    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <Grid
                container
                direction='column'
                justify='flex-start'
                spacing={3}
                alignItems='center'
            >
                <Grid
                    item
                >
                    <h2>Create Tasting</h2>
                </Grid>
                <FormikTasting
                    initialForm={initialTastingForm}
                    handleSubmit={handleCreate} 
                />
                <Grid
                    item
                >
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
