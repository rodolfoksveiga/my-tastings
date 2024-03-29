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
    id: number
    modified_at: string
    name: string
    beverage: number
    beverageName: string
    user: number
    color: string
    appearance: string
    aroma: string
    finish: string
    rating: number
}

export type TTastings = ITasting[]

interface ITastingsListProps {
    isAuthenticated: boolean
    accessToken: string | null
    tastings: TTastings | null
    message: string | null
    fetchTastingsList: Function
    fetchBeveragesList: Function
}


// Global variables
const useStyles = makeStyles(theme => ({
    parentGrid: {
        padding: theme.spacing(2)
    },
    pageTitle: {
        margin: theme.spacing(2)
    },
    createButton: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
        color: theme.palette.common.black,
        '&:hover': {
            color: theme.palette.primary.main,
            borderColor: theme.palette.primary.main
        }
    }
}))


// Component
export function TastingsList({ isAuthenticated, accessToken, tastings, message, fetchTastingsList, fetchBeveragesList }: ITastingsListProps) {
    const classes = useStyles()
    const history = useHistory()
    const [triggerReload, setTriggerReload] = useState<boolean>(false)

    useEffect(() => {
        fetchTastingsList(accessToken)
        fetchBeveragesList(accessToken)
    }, [accessToken, fetchTastingsList, fetchBeveragesList, triggerReload])

    function updateTriggerReload() {
        setTriggerReload(!triggerReload)
    }

    if (!isAuthenticated) {
        history.push('/login/')
    }

    return (
        <div>
            <Typography
                className={classes.pageTitle}
                variant='h4'
                component='h2'
                align='center'
            >
                Tastings List
            </Typography>
            <Grid className={classes.parentGrid}>
                <Grid item>
                    <Button
                        className={classes.createButton}
                        variant='outlined'
                        href='/tastings/create/'
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
    accessToken: state.authUser.accessToken,
    tastings: state.tastings.data,
    message: state.tastings.message
})

export default connect(mapStateToProps, { fetchTastingsList, fetchBeveragesList })(TastingsList)
