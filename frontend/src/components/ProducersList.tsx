import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import List from '@material-ui/core/List'

import ListProducerItem from './ListProducerItem'
import fetchProducersList from '../actions/fetchProducersList'
import { TRootState } from '../reducers/rootReducer'


// Types and interfaces
export interface IProducer {
    id: number
    modified_at: string
    name: string
    user: number
    userName: string
    country: string
    region: string
}

export type TProducers = IProducer[]

interface IProducersListProps {
    isAuthenticated: boolean
    accessToken: string | null
    producers: TProducers | null
    message: string | null
    fetchProducersList: Function
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
export function ProducersList({ isAuthenticated, accessToken, producers, message, fetchProducersList }: IProducersListProps) {
    const classes = useStyles()
    const history = useHistory()
    const [triggerReload, setTriggerReload] = useState<boolean>(false)

    useEffect(() => {
        fetchProducersList(accessToken)
    }, [accessToken, fetchProducersList, triggerReload])

    function updateTriggerReload() {
        setTriggerReload(!triggerReload)
    }

    if (!isAuthenticated) {
        history.push('/login/')
    }

    return (
        <div>
            <Typography className={classes.pageTitle} variant='h4' component='h4' align='center'>
                Producers List
            </Typography>
            <Grid className={classes.parentGrid}>
                <Grid item>
                    <Button
                        className={classes.createButton}
                        variant='outlined'
                        href='/producers/create/'
                        startIcon={<AddOutlinedIcon />}
                        fullWidth
                    >
                        Create new Producer
                    </Button>
                </Grid>
                {message ? (
                    <Grid item>
                        <h3>{message}</h3>
                    </Grid>
                ) : (
                    <Grid item>
                        <List>
                            {producers && (
                                producers.map(producer => {
                                    return (
                                        <ListProducerItem
                                            key={producer.id}
                                            producer={producer}
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
    producers: state.producers.data,
    message: state.producers.message
})

export default connect(mapStateToProps, { fetchProducersList })(ProducersList)
