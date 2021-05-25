// Import components, functions, types, variables, and styles
import axios from 'axios'
import * as Yup from 'yup'
import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined'

import { URL, TId, TErrorMessage, ITasting } from './Tastings'
import FormikTasting from './FormikTasting'

// Types and interfaces
type THistory = string

interface ITastingParams {
    id: string
}



const FormSchema = Yup.object().shape({
    color: Yup.string()
        .min(1, 'Too short!')
        .required('Required'),
    appearance: Yup.string()
        .min(1, 'Too short!')
        .required('Required'),
    aroma: Yup.string()
        .min(1, 'Too short!')
        .required('Required'),
    finish: Yup.string()
        .min(1, 'Too short!')
        .required('Required'),
    rating: Yup.string()
        .min(1, 'Too short!')
        .required('Required')
})



// Main component
export default function UpdateTasting() {
    const { id } = useParams<ITastingParams>()
    const history = useHistory<THistory>()
    const [tasting, setTasting] = useState<ITasting | null>()
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
                    'Error while retrieving the data. Check the Id!'
                )
            })
    }

    function putTasting(formValues: ITasting, id: TId) {
        axios
            .put(URL + id + '/', formValues)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
                setErrorMessage(
                    'Error while sending the data. Try again later!'
                )
            })
    }

    useEffect(() => {
        getTasting(id)
    }, [id])

    function handleUpdate(formValues: ITasting) {
        putTasting(formValues, id)
        history.push('/tastings/' + id + '/')
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
                    <h2>Update Tasting</h2>
                </Grid>
                {tasting
                ? 
                (
                    <FormikTasting
                        initialForm={tasting}
                        handleSubmit={handleUpdate} 
                    />
                )
                : null}
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
