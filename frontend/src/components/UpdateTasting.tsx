// Import components, functions, types, variables, and styles
import axios from 'axios'
import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'

import { URL, TId, THistory, TErrorMessage, ITasting } from './Tastings'

// Types and interfaces
type TTastingParams = {
    id: string
}

// Main component
export default function UpdateTasting() {
    const { id } = useParams<TTastingParams>()
    const history = useHistory<THistory>()
    const [tasting, setTasting] = useState<ITasting | null>()
    const [errorMessage, setErrorMessage] = useState<TErrorMessage>('')

    function getTasting(id: TId) {
        axios
            .get(URL + id)
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

    function putTasting(id: TId) {
        axios
            .put(URL + id, tasting)
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
        history.push('/tastings/' + id)
    }

    return (
        <div>
            {tasting ? (
                <div>
                    <form onSubmit={handleUpdate}>
                        <p>
                            <label htmlFor='name'>
                                <b>Name</b>
                            </label>
                            &ensp;
                            <input
                                type='text'
                                id='name'
                                name='name'
                                size={50}
                                value={tasting.name}
                                onChange={handleChange}
                            />
                        </p>
                        <p>
                            <label htmlFor='Category'>
                                <b>Category</b>
                            </label>
                            &ensp;
                            <input
                                type='number'
                                id='category'
                                name='category'
                                size={20}
                                value={tasting.category}
                                onChange={handleChange}
                            />
                        </p>
                        <p>
                            <label htmlFor='Producer'>
                                <b>Producer</b>
                            </label>
                            &ensp;
                            <input
                                type='number'
                                id='producer'
                                name='producer'
                                size={20}
                                value={tasting.producer}
                                onChange={handleChange}
                            />
                        </p>
                        <p>
                            <label htmlFor='Rating'>
                                <b>Rating</b>
                            </label>
                            &ensp;
                            <input
                                type='number'
                                id='rating'
                                name='rating'
                                size={20}
                                value={tasting.rating}
                                onChange={handleChange}
                            />
                        </p>
                        <p>
                            <label htmlFor='Color'>
                                <b>Color</b>
                            </label>
                            &ensp;
                            <input
                                type='text'
                                id='color'
                                name='color'
                                size={50}
                                value={tasting.color}
                                onChange={handleChange}
                            />
                        </p>
                        <p>
                            <label htmlFor='Appearance'>
                                <b>Appearance</b>
                            </label>
                            &ensp;
                            <input
                                type='text'
                                id='appearance'
                                name='appearance'
                                size={50}
                                value={tasting.appearance}
                                onChange={handleChange}
                            />
                        </p>
                        <p>
                            <label htmlFor='Aroma'>
                                <b>Aroma</b>
                            </label>
                            &ensp;
                            <input
                                type='text'
                                id='aroma'
                                name='aroma'
                                size={50}
                                value={tasting.aroma}
                                onChange={handleChange}
                            />
                        </p>
                        <p>
                            <label htmlFor='Finish'>
                                <b>Finish</b>
                            </label>
                            &ensp;
                            <input
                                type='text'
                                id='finish'
                                name='finish'
                                size={50}
                                value={tasting.finish}
                                onChange={handleChange}
                            />
                        </p>
                        <p>
                            <label htmlFor='Price'>
                                <b>Price</b>
                            </label>
                            &ensp;
                            <input
                                type='number'
                                id='price'
                                name='price'
                                placeholder='Price'
                                size={20}
                                min={0}
                                max={10000}
                                step={0.01}
                                value={tasting.price}
                                onChange={handleChange}
                            />
                        </p>
                        <p>
                            <label htmlFor='User'>
                                <b>User</b>
                            </label>
                            &ensp;
                            <input
                                type='number'
                                id='user'
                                name='user'
                                size={20}
                                value={tasting.user}
                                onChange={handleChange}
                            />
                        </p>
                        <button type='submit'>Update Tasting</button>
                        &ensp;&ensp;
                        <button
                            onClick={() => {
                                history.push(`/tastings/${id}`)
                            }}
                        >
                            Cancel
                        </button>
                    </form>
                    <br />
                    <button onClick={() => {
                        history.push('/tastings/')
                    }}>Go back to Tastings List</button>
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
