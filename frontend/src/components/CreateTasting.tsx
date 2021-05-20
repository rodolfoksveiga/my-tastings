// Import components, functions, types, variables, and styles
import axios from 'axios'
import { useState,  ChangeEvent, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'

import { URL, TErrorMessage, THistory } from './Tastings'

// Types and interfaces
export interface ITastingForm {
    name: string
    category: number | null
    producer: number | null
    rating: number | null
    color: string
    appearance: string
    aroma: string
    finish: string
    price: number | null
    user: number | null
}

// Global variables
export const initialTastingForm: ITastingForm = Object.freeze({
    name: '',
    category: null,
    producer: null,
    rating: null,
    color: '',
    appearance: '',
    aroma: '',
    finish: '',
    price: null,
    user: null
})

// Main component
export default function CreateTasting() {
    const history = useHistory<THistory>()
    const [tastingForm, setTastingForm] =
        useState<ITastingForm>(initialTastingForm)
    const [errorMessage, setErrorMessage] = useState<TErrorMessage>('')

    function handleChange(
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setTastingForm({
            ...tastingForm,
            [event.target.name]: event.target.value,
        })
    }

    function handleReset() {
        setTastingForm(initialTastingForm)
    }

    function postTasting() {
        console.log(tastingForm)
        axios
            .post(URL, tastingForm)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
                setErrorMessage('Error while sending the data. Try again!')
            })
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault()
        postTasting()
        history.push('/tastings/')
    }

    return (
        <div>
            {errorMessage !== '' ? <h3>{errorMessage}</h3> : null}
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <p>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        placeholder='Name'
                        size={50}
                        onChange={handleChange}
                        required
                    />
                </p>
                <p>
                    <input
                        type='number'
                        id='category'
                        name='category'
                        placeholder='Category'
                        size={20}
                        onChange={handleChange}
                        required
                    />
                </p>
                <p>
                    <input
                        type='number'
                        id='producer'
                        name='producer'
                        placeholder='Producer'
                        size={20}
                        onChange={handleChange}
                        required
                    />
                </p>
                <p>
                    <input
                        type='number'
                        id='rating'
                        name='rating'
                        placeholder='Rating'
                        size={20}
                        onChange={handleChange}
                        required
                    />
                </p>
                <p>
                    <input
                        type='text'
                        id='color'
                        name='color'
                        placeholder='Color'
                        size={50}
                        onChange={handleChange}
                        required
                    />
                </p>
                <p>
                    <input
                        type='text'
                        id='appearance'
                        name='appearance'
                        placeholder='Appearance'
                        size={50}
                        onChange={handleChange}
                        required
                    />
                </p>
                <p>
                    <input
                        type='text'
                        id='aroma'
                        name='aroma'
                        placeholder='Aroma'
                        size={50}
                        onChange={handleChange}
                        required
                    />
                </p>
                <p>
                    <input
                        type='text'
                        id='finish'
                        name='finish'
                        placeholder='Finish'
                        size={50}
                        onChange={handleChange}
                        required
                    />
                </p>
                <p>
                    <input
                        type='number'
                        id='price'
                        name='price'
                        placeholder='Price'
                        min={0}
                        max={10000}
                        step={0.01}
                        size={20}
                        onChange={handleChange}
                        required
                    />
                </p>
                <p>
                    <input
                        type='number'
                        id='user'
                        name='user'
                        placeholder='User'
                        size={20}
                        onChange={handleChange}
                        required
                    />
                </p>
                <button type='submit'>Save Tasting</button>
                &ensp;&ensp;
                <button type='reset'>Clear fields</button>
            </form>
            <br />
            <button onClick={() => {
                history.push('/tastings/')
            }}>Go back to Tastings List</button>
        </div>
    )
}
