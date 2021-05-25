// Import components, functions, types, variables, and styles
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined'

import { URL, TId, TErrorMessage, ITasting } from './Tastings'

// Types and interfaces
interface ITastingParams {
    id: string
}

// Main component
export default function Tasting() {
    const { id } = useParams<ITastingParams>()
    const [tasting, setTasting] = useState<ITasting | null>(null)
    const [errorMessage, setErrorMessage] = useState<TErrorMessage>('')

    function getTasting(id: TId) {
        axios
        .get(URL + id + '/')
        .then((response) => {
            console.log(response)
            setTasting(response.data)
        })
        .catch((error) => {
            console.log(error)
            setErrorMessage(
                'Error while retrieving the data. Reload the page.'
            )
        })
    }

    useEffect(() => {
        getTasting(id)
    }, [id])

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
                    <h2>Tasting Details</h2>
                </Grid>
            {tasting
            ? (
                <div>
                    <Grid
                        item
                    >
                        <h3>Beverage: {tasting.beverage}</h3>
                        <h4>Modified at: {tasting.modified_at}</h4>
                        <h4>Color: {tasting.color}</h4>
                        <h4>Appearance: {tasting.appearance}</h4>
                        <h4>Arroma: {tasting.aroma}</h4>
                        <h4>Finish: {tasting.finish}</h4>
                        <h4>Rating: {tasting.rating}</h4>
                    </Grid>
                    <Grid>
                        <Button
                            variant='outlined'
                            href={'/tastings/' + id + '/update/'}
                            color='primary'
                            startIcon={<EditOutlinedIcon />}
                            fullWidth
                        >
                            Update Tasting
                        </Button>
                    </Grid>
                    <Grid
                        item
                    >
                        <Button
                            variant='outlined'
                            href='/tastings/'
                            startIcon={<ArrowBackOutlinedIcon />}
                            fullWidth
                        >
                            Back to Tastings List
                        </Button>
                    </Grid>
                </div>
            )
            : null}
            </Grid>
        </div>
    )
}
