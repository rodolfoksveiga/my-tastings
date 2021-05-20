// Import components, functions, types, variables, and styles
import axios from 'axios'
import { useState, useEffect, ChangeEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'

import DeleteTasting from './DeleteTasting'

// Types and interfaces
export type THistory = string

export type TErrorMessage = string

export type TId = string

type TSearch = string

type TTriggerReload = boolean

export interface ITasting {
    id: TId
    created_at: string
    name: string
    category: number
    producer: number
    rating: number
    color: string
    appearance: string
    aroma: string
    finish: string
    price: number
    user: number
}

// Global variables
export const URL = 'http://localhost:8000/api/tastings/'
// export const URL = 'http://127.0.0.1/api/tastings/'

// Main component
export default function Tastings() {
    const history = useHistory<THistory>()
    const [triggerReload, setTriggerReload] = useState<TTriggerReload>(false)
    const [tastings, setTastings] = useState<ITasting[]>([])
    const [errorMessage, setErrorMessage] = useState<TErrorMessage>('')
    const [search, setSearch] = useState<TSearch>('')

    function getTastings() {
        axios
            .get(URL)
            .then((response) => {
                console.log(response)
                setTastings(response.data)
            })
            .catch((error) => {
                console.log(error)
                setErrorMessage(
                    'Error while retrieving the data. Reload the page.'
                )
            })
    }

    useEffect(() => {
        getTastings()
    }, [triggerReload])

    function handleFilter(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        setSearch(event.target.value)
    }

    const filteredTastings = tastings.filter((tasting: ITasting) => {
        return tasting.name.toLowerCase().includes(search.toLowerCase())
    })

    function updateTriggerReload() {
        setTriggerReload(!triggerReload)
        console.log(triggerReload)
    }

    return (
        <div>
            <h2>List of Tastings</h2>
            <button
                onClick={() => {
                    history.push(`/tastings/create/`)
                }}
            >
                Create new Tasting
            </button>
            <p>
                <input
                    type='text'
                    placeholder='Search'
                    onChange={handleFilter}
                />
            </p>
            <ul>
                {filteredTastings.length
                    ? filteredTastings.map((tasting) => {
                          return (
                              <li key={tasting.id}>
                                  <h4>
                                      <Link to={`/tastings/${tasting.id}`}>
                                          {tasting.name}
                                      </Link>
                                      &ensp; - &ensp;
                                      <button
                                          onClick={() => {
                                              history.push(
                                                  `/tastings/${tasting.id}/update/`
                                              )
                                          }}
                                      >
                                          Update
                                      </button>
                                      &ensp;&ensp;
                                      <DeleteTasting tasting={tasting} updateTriggerReload={updateTriggerReload} />
                                  </h4>
                              </li>
                          )
                      })
                    : null}
            </ul>
            {errorMessage !== '' ? <h3>{errorMessage}</h3> : null}
        </div>
    )
}
