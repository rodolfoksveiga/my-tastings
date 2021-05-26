import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TRootState } from '../reducers/types'
import { getTasting } from '../actions/tastingActions'
import { useParams } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined'

import { ITastingParams } from './types'


export default function TestTasting() {
    const { id } = useParams<ITastingParams>()
    const tastingState = useSelector((state: TRootState) => state.tasting)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTasting(id))
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
                spacing={3}
                alignItems='center'
            >
                <Grid
                    item
                >
                    <h2>Tasting Details</h2>
                </Grid>
                <Grid
                    item
                >
                    {tastingState.error && (
                        <h3>{tastingState.error}</h3>
                    )}
                </Grid>
                {tastingState.tasting && (
                <div>
                    <Grid
                        item
                    >
                        <h3>Beverage: {tastingState.tasting.beverage}</h3>
                        <h4>Modified at: {tastingState.tasting.modified_at}</h4>
                        <h4>Color: {tastingState.tasting.color}</h4>
                        <h4>Appearance: {tastingState.tasting.appearance}</h4>
                        <h4>Arroma: {tastingState.tasting.aroma}</h4>
                        <h4>Finish: {tastingState.tasting.finish}</h4>
                        <h4>Rating: {tastingState.tasting.rating}</h4>
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
