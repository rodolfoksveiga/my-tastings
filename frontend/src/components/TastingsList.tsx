import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

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
    access: string | null
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
export function TastingsList({ isAuthenticated, access, tastings, message, fetchTastingsList, fetchBeveragesList }: ITastingsListProps) {
    const classes = useStyles()
    const history = useHistory()
    const [triggerReload, setTriggerReload] = useState<TTriggerReload>(false)

    useEffect(() => {
        fetchTastingsList(access)
        fetchBeveragesList(access)
    }, [access, fetchTastingsList, fetchBeveragesList, triggerReload])

    function updateTriggerReload() {
        setTriggerReload(!triggerReload)
    }

    if (!isAuthenticated) {
        history.push('/login/')
    }

    return (
        <div>
            <Typography variant='h4' component='h4' align='center'>
                Tastings List
            </Typography>
            <Grid className={classes.container}>
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
                                tastings.map(tasting => {
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
    access: state.authUser.access,
    tastings: state.tastings.data,
    message: state.tastings.message
})

export default connect(mapStateToProps, { fetchTastingsList, fetchBeveragesList })(TastingsList)
