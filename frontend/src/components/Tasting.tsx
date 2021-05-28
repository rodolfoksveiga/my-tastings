// Import components, functions, types, variables, and styles
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined'

import { TRootState } from '../reducers/rootReducer'
import { fetchTastingDetails } from '../actions/fetchTastingDetails'


// Types and interfaces
interface ITastingParams {
    id: string
}


// Main component
export default function Tasting() {
    const { id } = useParams<ITastingParams>()
    const state = useSelector((state: TRootState) => state.fetchTastingDetails)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTastingDetails(id))
    }, [dispatch, id])

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
                alignItems='center'
            >
                <Grid
                    item
                >
                    <h2>Tasting Details</h2>
                </Grid>
                {state.tasting && (
                    <div>
                        <Grid
                            item
                        >
                            <h3>Name: {state.tasting.name}</h3>
                            <h4>Beverage: {state.tasting.beverage}</h4>
                            <h4>Modified at: {state.tasting.modified_at}</h4>
                            <h4>Color: {state.tasting.color}</h4>
                            <h4>Appearance: {state.tasting.appearance}</h4>
                            <h4>Arroma: {state.tasting.aroma}</h4>
                            <h4>Finish: {state.tasting.finish}</h4>
                            <h4>Rating: {state.tasting.rating}</h4>
                        </Grid>
                        <Grid>
                            <Button
                                variant='outlined'
                                href={'/tastings/' + id + '/update/'}
                                color='primary'
                                startIcon={<EditOutlinedIcon />}
                                fullWidth
                            >
                                Update Tasting
                            </Button>
                        </Grid>
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
                    </div>
                )}
            </Grid>
        </div>
    )
}
