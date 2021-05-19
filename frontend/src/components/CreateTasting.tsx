// Import components, functions, types, variables, and styles
import { useState, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'

import { TErrorMessage } from './Tastings'

// Types and interfaces
interface ITastingForm {
    userId: string
    title: string
    body: string
}

// Global variables
export const URL = 'https://jsonplaceholder.typicode.com/posts/'

const initialTastingForm: ITastingForm = Object.freeze({
    userId: '',
    title: '',
    body: '',
})

// Main component
export default function CreateTasting() {
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
        setTastingForm(initialTastingForm)
    }

    return (
        <div>
            {errorMessage !== '' ? <h3>{errorMessage}</h3> : null}
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <p>
                    <input
                        type='text'
                        id='text'
                        name='userId'
                        placeholder='User Id'
                        autoComplete='userId'
                        value={tastingForm.userId}
                        onChange={handleChange}
                        required
                    />
                </p>
                <p>
                    <input
                        type='text'
                        id='title'
                        name='title'
                        placeholder='Title'
                        autoComplete='title'
                        value={tastingForm.title}
                        onChange={handleChange}
                        required
                    />
                </p>
                <p>
                    <textarea
                        name='body'
                        placeholder='Body'
                        autoComplete='body'
                        rows={10}
                        cols={100}
                        value={tastingForm.body}
                        onChange={handleChange}
                        required
                    />
                </p>
                <button type='submit'>Save Tasting</button>
                &ensp;&ensp;
                <button type='reset'>Clear fields</button>
            </form>
        </div>
    )
}
