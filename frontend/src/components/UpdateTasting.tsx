// Import components, functions, types, variables, and styles
import axios from 'axios'
import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'

import { TErrorMessage, ITasting } from './Tastings'

// Types and interfaces
type TTastingParams = {
    id: string
}

type THistory = string

type TId = string

// Main component
export default function UpdateTasting() {
    const { id } = useParams<TTastingParams>()
    const history = useHistory<THistory>()
    const [tasting, setTasting] = useState<ITasting | null>()
    const [errorMessage, setErrorMessage] = useState<TErrorMessage>('')

    function getTasting(id: TId) {
        axios
            .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then((response) => {
                setTasting(response.data)
            })
            .catch((error) => {
                console.log(error)
                setErrorMessage(
                    'Error while retrieving the data. Check the Id!'
                )
            })
    }

    function putTasting(id: TId) {
        axios
            .put(`https://jsonplaceholder.typicode.com/posts/${id}`, tasting)
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

    function handleChange(
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        if (tasting) {
            setTasting({
                ...tasting,
                [event.target.name]: event.target.value,
            })
        }
    }

    function handleUpdate(event: FormEvent) {
        event.preventDefault()
        putTasting(id)
        setTasting(tasting)
        history.push('/tasting/')
    }

    return (
        <div>
            {tasting ? (
                <div>
                    <form onSubmit={handleUpdate}>
                        <label htmlFor='userId'>
                            <b>User Id</b>
                        </label>
                        <p>
                            <input
                                id='userId'
                                name='userId'
                                size={5}
                                value={tasting.userId}
                                onChange={handleChange}
                            />
                        </p>
                        <br />
                        <label htmlFor='title'>
                            <b>Title</b>
                        </label>
                        <p>
                            <input
                                id='title'
                                name='title'
                                size={50}
                                value={tasting.title}
                                onChange={handleChange}
                            />
                        </p>
                        <br />
                        <label htmlFor='body'>
                            <b>Body</b>
                        </label>
                        <p>
                            <textarea
                                id='body'
                                name='body'
                                rows={10}
                                cols={100}
                                value={tasting.body}
                                onChange={handleChange}
                            />
                        </p>
                        <button type='submit'>Update Tasting</button>
                        &ensp;&ensp;
                        <button
                            onClick={() => {
                                history.push('/tastings/')
                            }}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            ) : (
                <div>
                    <h3>{errorMessage}</h3>
                    <h4>
                        <Link to={'/tastings/'}>Back to List of Tastings</Link>
                    </h4>
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
