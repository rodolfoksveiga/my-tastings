import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import List from '@material-ui/core/List'

import ListBeverageItem from './ListBeverageItem'
import fetchBeveragesList from '../actions/fetchBeveragesList'
import { TRootState } from '../reducers/rootReducer'


// Types and interfaces
type TTriggerReload = boolean

export interface IBeverage {
    id: string
    modified_at: string
    name: string
    category: number
    producer: number
    user: number
    classification: string
    base: string
    year: string
    degree: number
    volume: number
    price: number
    tags: string[]
}

export type TBeverages = IBeverage[]

interface IBeveragesListProps {
    isAuthenticated: boolean
    access: string | null
    beverages: TBeverages | null
    message: string | null
    fetchBeveragesList: Function
}


// Global variables
const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(5),
    }
}))


// Component
export function BeveragesList({ isAuthenticated, access,  beverages, message, fetchBeveragesList }: IBeveragesListProps) {
    const classes = useStyles()
    const [triggerReload, setTriggerReload] = useState<TTriggerReload>(false)

    useEffect(() => {
        fetchBeveragesList(access)
    }, [access, fetchBeveragesList, triggerReload])

    function updateTriggerReload() {
        setTriggerReload(!triggerReload)
        console.log(triggerReload)
    }

    return (
        <div>
            <Typography variant='h4' component='h4' align='center'>
                Beverages List
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
    access: state.authUser.access,
    beverages: state.beverages.data,
    message: state.beverages.message 
})

export default connect(mapStateToProps, { fetchBeveragesList })(BeveragesList)