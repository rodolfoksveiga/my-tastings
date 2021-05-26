// Import components, functions, types, variables, and styles
import axios from 'axios'
import { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import List from '@material-ui/core/List'

import ListTastingItem from './ListTastingItem'
import { TTriggerReload, ITasting, TErrorMessage } from '../types'


// Global variables
export const URL = 'http://localhost:8000/api/tastings/'
// export const URL = 'http://127.0.0.1/api/tastings/'


// Main component
export default function Tastings() {
    const [triggerReload, setTriggerReload] = useState<TTriggerReload>(false)
    const [tastings, setTastings] = useState<ITasting[]>([])
    const [errorMessage, setErrorMessage] = useState<TErrorMessage>('')

    function getTastings() {
        axios
            .get(URL)
            .then((response) => {
                console.log(response)
                setTastings(response.data)
            })
            .catch((error) => {
                console.log(error)
                setErrorMessage(
                    'Error while retrieving the data. Reload the page.'
                )
            })
    }

    useEffect(() => {
        getTastings()
    }, [triggerReload])

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
            {errorMessage !== '' ? <h3>{errorMessage}</h3> : null}
            <Grid
                container
                direction='column'
                justify='flex-start'
                spacing={3}
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
                        {tastings.length
                        ? tastings.map((tasting) => {
                                return (
                                    <ListTastingItem
                                        tasting={tasting}
                                        updateTriggerReload={updateTriggerReload}
                                    />
                                )
                        }
                        )
                        : null}
                    </List>
                </Grid>
            </Grid>
        </div>
    )
}
