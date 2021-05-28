import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import List from '@material-ui/core/List'

import { fetchTastingsList } from '../actions/fetchTastingsList'
import { TRootState } from '../reducers/rootReducer'
import ListTastingItem from './ListTastingItem'
import { TTastings, TTriggerReload } from './types'


// Types and interfaces
interface ITastingsListProps {
    isAuthenticated: boolean | null,
    tastings: TTastings | null,
    fetchTastingsList: Function
}


// Component
export function TastingsList({ isAuthenticated, tastings, fetchTastingsList }: ITastingsListProps) {
    const [triggerReload, setTriggerReload] = useState<TTriggerReload>(false)

    useEffect(() => {
        fetchTastingsList()
    })

    function updateTriggerReload() {
        setTriggerReload(!triggerReload)
        console.log(triggerReload)
    }

    // if (!isAuthenticated) {
    //    return (
    //        <Redirect to='/login/' />
    //    )
    //}

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
                        {tastings && (
                            tastings.map((tasting) => {
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


// Connect to Redux
const mapStateToProps = (state: TRootState) => ({
    tastings: state.fetchTastingsList.tastings,
    isAuthenticated: state.authUser.isAuthenticated
})

export default connect(mapStateToProps, { fetchTastingsList })(TastingsList)
