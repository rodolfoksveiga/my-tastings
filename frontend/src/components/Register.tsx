// Import components, functions, types, variables, and styles
import { ChangeEvent, FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'

import axiosInstance from '../axios'

// Types and interfaces
interface IFormData {
    username: string
    email: string
    password: string
}

// Main component
export default function Register() {
    const history = useHistory()
    const initialFormData = Object.freeze({
        username: '',
        email: '',
        password: '',
    })
    const [formData, setFormData] = useState<IFormData>(initialFormData)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value.trim(),
        })
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        console.log(formData)

        axiosInstance
            .post('user/register/', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            })
            .then((response) => {
                history.push('/login')
                console.log(response)
                console.log(response.data)
            })
    }

    return (
        <div>
            <h2>Registration</h2>
            <form>
                <input
                    id='username'
                    name='username'
                    placeholder='Username'
                    autoComplete='username'
                    required
                    onChange={handleChange}
                />
                <input
                    id='email'
                    name='email'
                    placeholder='Email'
                    autoComplete='email'
                    required
                    onChange={handleChange}
                />
                <input
                    type='password'
                    id='password'
                    name='password'
                    placeholder='Password'
                    autoComplete='current-password'
                    required
                    onChange={handleChange}
                />
                <button type='submit' onClick={handleSubmit}>
                    Create user
                </button>
            </form>
        </div>
    )
}
