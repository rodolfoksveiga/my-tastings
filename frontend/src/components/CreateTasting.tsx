// Import components, functions, types, variables, and styles
import axios from 'axios'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import 'fontsource-roboto'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined'

import { URL } from './Tastings'
import FormikTasting from './FormikTasting'
import { THistory, TErrorMessage, ITastingForm } from './types'


// Global variables
const initialTastingForm: ITastingForm = {
    beverage: null,
    user: null,
    color: '',
    appearance: '',
    aroma: '',
    finish: '',
    rating: null
}


// Main component
export default function CreateTasting() {
    const history = useHistory<THistory>()
    const [errorMessage, setErrorMessage] = useState<TErrorMessage>('')

    function postTasting(form: ITastingForm) {
        console.log(form)
        axios
            .post(URL, form)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
                setErrorMessage('Error while sending the data. Try again!')
            })
    }

    function handleCreate(form: ITastingForm) {
        postTasting(form)
        history.push('/tastings/')
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
                    <h2>Create Tasting</h2>
                </Grid>
                <FormikTasting
                    initialForm={initialTastingForm}
                    handleSubmit={handleCreate} 
                />
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
            </Grid>
        </div>
    )
}
