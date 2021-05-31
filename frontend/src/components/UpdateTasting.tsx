// Import components, functions, types, variables, and styles
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined'

import FormikTasting from './FormikTasting'
import fetchTastingDetails from '../actions/fetchTastingDetails'
import updateTasting from '../actions/updateTasting'
import { TRootState } from '../reducers/rootReducer'
import { ITastingParams } from './TastingDetails'
import { ITastingForm } from './CreateTasting'


// Main component
export default function UpdateTasting() {
    const { id } = useParams<ITastingParams>()
    const history = useHistory()
    const state = useSelector((state: TRootState) => state.fetchTastingDetails)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTastingDetails(id))
    }, [dispatch, id])

    function handleUpdate(form: ITastingForm) {
        dispatch(updateTasting(id, form))
        history.push('/tastings/' + id + '/')
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
                    <h2>Update Tasting</h2>
                </Grid>
                {state.tasting && (
                    <FormikTasting
                        initialForm={state.tasting}
                        handleSubmit={handleUpdate} 
                    />
                )}
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
