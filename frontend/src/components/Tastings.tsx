import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import List from '@material-ui/core/List'

import { fetchTastingsList } from '../actions/fetchTastingsList'
import { TRootState } from '../reducers/rootReducer'
import ListTastingItem from './ListTastingItem'
import { TTriggerReload } from './types'


export default function TestTasting() {
    const [triggerReload, setTriggerReload] = useState<TTriggerReload>(false)
    const state = useSelector((state: TRootState) => state.fetchTastingsList)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTastingsList())
    }, [dispatch, triggerReload])

    function updateTriggerReload() {
        setTriggerReload(!triggerReload)
        console.log(triggerReload)
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
                alignItems='center'
            >
                <Grid
                    item
                >
                    <h2>List of Tastings</h2>
                </Grid>
                <Grid
                    item
                >
                    <Button
                        variant='outlined'
                        href='/tastings/create/'
                        color='primary'
                        startIcon={<AddOutlinedIcon />}
                        fullWidth
                    >
                        Create new Tasting
                    </Button>
                </Grid>
                <Grid
                    item
                >
                    <List>
                        {state.tastings && (
                            state.tastings.map((tasting) => {
                                return (
                                    <ListTastingItem
                                        tasting={tasting}
                                        updateTriggerReload={updateTriggerReload}
                                    />
                                )
                            })
                        )}
                    </List>
                </Grid>
            </Grid>
        </div>
    )
}
