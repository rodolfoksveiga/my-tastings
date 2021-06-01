import { useState, useEffect } from 'react'
import { connect } from 'react-redux'

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
    isAuthenticated: boolean,
    beverages: TBeverages | null
    message: string | null
    fetchBeveragesList: Function
}


// Component
export function BeveragesList({ isAuthenticated, beverages, message, fetchBeveragesList }: IBeveragesListProps) {
    const [triggerReload, setTriggerReload] = useState<TTriggerReload>(false)

    useEffect(() => {
        fetchBeveragesList()
    }, [fetchBeveragesList, triggerReload])

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
                    <h2>List of Beverages</h2>
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
                        Create new Beverage
                    </Button>
                </Grid>
                {message ? (
                    <Grid
                        item
                    >
                        <h3>{message}</h3>
                    </Grid>
                ) : (
                    <Grid
                        item
                    >
                        <List>
                            {beverages && (
                                beverages.map(beverage => {
                                    return (
                                        <ListBeverageItem
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
    beverages: state.beverages.data,
    error: state.beverages.message 
})

export default connect(mapStateToProps, { fetchBeveragesList })(BeveragesList)
