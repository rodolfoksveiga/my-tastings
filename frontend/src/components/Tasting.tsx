// Import components, functions, types, variables, and styles
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { TIsLoading, TErrorMessage, ITasting } from './Tastings'

// Types and interfaces
type TTastingParams = {
    id: string
}

type TId = string

// Main component
export default function Tasting() {
    const { id } = useParams<TTastingParams>()
    const [tasting, setTasting] = useState<ITasting | null>(null)
    const [isLoading, setIsLoading] = useState<TIsLoading>(true)
    const [errorMessage, setErrorMessage] = useState<TErrorMessage>('')

    function getTasting(id: TId) {
        axios
            .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then((response) => {
                setTasting(response.data)
                setIsLoading(false)
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

    if (isLoading) {
        return <h3>Loading data...</h3>
    }

    return (
        <div>
            {errorMessage !== '' ? <h3>{errorMessage}</h3> : null}
            {tasting ? (
                <div>
                    <h3>{tasting.title}</h3>
                    <div>
                        <b>User: </b>
                        {tasting.userId}
                    </div>
                    <h4>Body</h4>
                    <ul>
                        <li>{tasting.body}</li>
                    </ul>
                    <br />
                    <Link to={`/tastings/${id}/update/`}>Update Tasting</Link>
                    &ensp; | &ensp;
                    <Link to={'/tastings/'}>Back to List of Tastings</Link>
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
/*
export default Tasting: React.FunctionComponent<ITastingProps> = ({tasting, dispatch}) => {
    function deleteTasting() {
        dispatch({ type: 'DELETE_TASTING', payload: {added: tasting.added}})
    }

    return (
        <div>
            <ul>
                <h3>{tasting.name} - <button onClick={deleteTasting}>Delete</button></h3>
                <li>Category: {tasting.category}</li>
                <li>Producer: {tasting.producer}</li>
                <li>Rating: {tasting.rating}</li>
                <li>Color: {tasting.color}</li>
                <li>Appearance: {tasting.appearance}</li>
                <li>Aroma: {tasting.aroma}</li>
                <li>Finish: {tasting.finish}</li>
                <li>Price: {tasting.price}</li>
                <li>Added: {tasting.added}</li>
                <br />
            </ul>
        </div>
    )
}
*/
