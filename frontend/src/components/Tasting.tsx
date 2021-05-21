// Import components, functions, types, variables, and styles
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'

import { URL, TId, TErrorMessage, ITasting } from './Tastings'

// Types and interfaces
type THistory = string

interface ITastingParams {
    id: string
}

// Main component
export default function Tasting() {
    const { id } = useParams<ITastingParams>()
    const history = useHistory<THistory>()
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
            {errorMessage !== '' ? <h3>{errorMessage}</h3> : null}
            {tasting ? (
                <div>
                    <h3>{tasting.name}</h3>
                    <h4>Created at: {tasting.created_at}</h4>
                    <h4>Category: {tasting.category}</h4>
                    <h4>Producer: {tasting.producer}</h4>
                    <h4>Rating: {tasting.rating}</h4>
                    <h4>Color: {tasting.color}</h4>
                    <h4>Appearance: {tasting.appearance}</h4>
                    <h4>Arroma: {tasting.aroma}</h4>
                    <h4>Finish: {tasting.finish}</h4>
                    <h4>Price: {tasting.price}</h4>
                    <br />
                    <button onClick={() => {
                        history.push('/tastings/' + id + '/update/')
                    }}>Update Tasting</button>
                    <br />
                    <br />
                    <button onClick={() => {
                        history.push('/tastings/')
                    }}>Go back to Tastings List</button>
                </div>
            ) : (
                <div>
                    <br />
                    <Link to={'/tastings/'}>Back to List of Tastings</Link>
                </div>
            )}
        </div>
    )
}
