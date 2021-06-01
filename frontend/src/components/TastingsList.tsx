import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import List from '@material-ui/core/List'

import ListTastingItem from './ListTastingItem'
import fetchTastingsList from '../actions/fetchTastingsList'
import fetchBeveragesList from '../actions/fetchBeveragesList'
import { TRootState } from '../reducers/rootReducer'


// Types and interfaces
export interface ITasting {
    id: string
    modified_at: string
    name: string
    beverage: number
    beverageName: string
    user: number
    userName: string
    color: string
    appearance: string
    aroma: string
    finish: string
    rating: number
}

export type TTastings = ITasting[]

type TTriggerReload = boolean

interface ITastingsListProps {
    isAuthenticated: boolean
    tastings: TTastings | null
    message: string | null
    fetchTastingsList: Function
    fetchBeveragesList: Function
}


// Global variables
const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(5),
    }
}))


// Component
export function TastingsList({ isAuthenticated, tastings, message, fetchTastingsList, fetchBeveragesList }: ITastingsListProps) {
    const classes = useStyles()
    const [triggerReload, setTriggerReload] = useState<TTriggerReload>(false)

    useEffect(() => {
        fetchTastingsList()
        fetchBeveragesList()
    }, [fetchTastingsList, fetchBeveragesList, triggerReload])

    function updateTriggerReload() {
        setTriggerReload(!triggerReload)
    }

    return (
        <div>
            <Typography variant='h4' component='h4' align='center'>
                Tastings List
            </Typography>
            <Grid
                className={classes.container}
                direction='column'
                justify='flex-start'
                alignItems='center'
            >
                <Grid item>
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
                {message ? (
                    <Grid item>
                        <h3>{message}</h3>
                    </Grid>
                ) : (
                    <Grid item>
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
    tastings: state.tastings.data,
    message: state.tastings.message
})

export default connect(mapStateToProps, { fetchTastingsList, fetchBeveragesList })(TastingsList)
