import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import List from '@material-ui/core/List'

import ListBeverageItem from './ListBeverageItem'
import fetchBeveragesList from '../actions/fetchBeveragesList'
import { TRootState } from '../reducers/rootReducer'
import fetchCategoriesList from '../actions/fetchCategoriesList'
import fetchProducersList from '../actions/fetchProducersList'


// Types and interfaces
export interface IBeverage {
    id: number
    modified_at: string
    name: string
    category: number
    categoryName: string
    producer: number
    producerName: string
    user: number
    classification: string
    base: string
    year: number
    volume: number
    degree: string
    price: string
}

export type TBeverages = IBeverage[]

interface IBeveragesListProps {
    isAuthenticated: boolean
    accessToken: string | null
    beverages: TBeverages | null
    message: string | null
    fetchBeveragesList: Function
    fetchCategoriesList: Function
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
export function BeveragesList({
        isAuthenticated,
        accessToken,
        beverages,
        message,
        fetchBeveragesList,
        fetchCategoriesList,
        fetchProducersList
    }: IBeveragesListProps) {
    const classes = useStyles()
    const history = useHistory()
    const [triggerReload, setTriggerReload] = useState<boolean>(false)

    useEffect(() => {
        fetchBeveragesList(accessToken)
        fetchCategoriesList(accessToken)
        fetchProducersList(accessToken)
    }, [accessToken, fetchBeveragesList, fetchCategoriesList, fetchProducersList,  triggerReload])

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
                Beverages List
            </Typography>
            <Grid className={classes.parentGrid}>
                <Grid item>
                    <Button
                        className={classes.createButton}
                        variant='outlined'
                        href='/beverages/create/'
                        startIcon={<AddOutlinedIcon />}
                        fullWidth
                    >
                        Create new Beverage
                    </Button>
                </Grid>
                {message ? (
                    <Grid item>
                        <h3>{message}</h3>
                    </Grid>
                ) : (
                    <Grid item>
                        <List>
                            {beverages && (
                                beverages.map(beverage => {
                                    return (
                                        <ListBeverageItem
                                            key={beverage.id}
                                            beverage={beverage}
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
    beverages: state.beverages.data,
    message: state.beverages.message
})

export default connect(mapStateToProps, {
    fetchBeveragesList,
    fetchCategoriesList,
    fetchProducersList
})(BeveragesList)
