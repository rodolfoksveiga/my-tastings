import { useState, useEffect } from 'react'
// import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import List from '@material-ui/core/List'

import ListTastingItem from './ListTastingItem'
import fetchTastingsList from '../actions/fetchTastingsList'
import { TRootState } from '../reducers/rootReducer'


// Types and interfaces
export interface ITasting {
    id: string
    modified_at: string
    name: string
    beverage: number | null
    beverageName: string
    user: number | null
    userName: string
    color: string
    appearance: string
    aroma: string
    finish: string
    rating: number | null
}

export type TTastings = ITasting[]

type TTriggerReload = boolean

interface ITastingsListProps {
    isAuthenticated: boolean,
    tastings: TTastings | null,
    error: string | null,
    fetchTastingsList: Function
}


// Component
export function TastingsList({ isAuthenticated, tastings, error, fetchTastingsList }: ITastingsListProps) {
    const [triggerReload, setTriggerReload] = useState<TTriggerReload>(false)

    useEffect(() => {
        fetchTastingsList()
    }, [fetchTastingsList, triggerReload])

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
                {error ? (
                    <Grid
                        item
                    >
                        <h3>{error}</h3>
                    </Grid>
                ) : (
                    <Grid
                        item
                    >
                        <List>
                            {tastings && (
                                tastings.map((tasting) => {
                                    return (
                                        <ListTastingItem
                                            key={tasting.id}
                                            tasting={tasting}
                                            updateTriggerReload={updateTriggerReload}
                                        />
                                    )
                                })
                            )}
                        </List>
                    </Grid>
                )}
                
            </Grid>
        </div>
    )
}


// Connect to Redux
const mapStateToProps = (state: TRootState) => ({
    isAuthenticated: state.authUser.isAuthenticated,
    tastings: state.fetchTastingsList.tastings,
    error: state.fetchTastingsList.error    
})

export default connect(mapStateToProps, { fetchTastingsList })(TastingsList)
