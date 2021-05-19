// Import components, functions, types, variables, and styles
import axios from 'axios'
import { useState, useEffect, ChangeEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'

import DeleteTasting from './DeleteTasting'

// Types and interfaces
type THistory = string

export type TErrorMessage = string

export type TIsLoading = boolean

type TId = string

type TSearch = string
/*
export interface ITasting {
  id: number
  added: string
  name: string
  category: string
  producer: string
  rating: number
  color: string
  appearance: string
  aroma: string
  finish: string
  price: number
}
*/
export interface ITasting {
    id: TId
    userId: string
    title: string
    body: string
}

// Global variables
export const URL = 'https://jsonplaceholder.typicode.com/posts/'

// Main component
export default function Tastings() {
    const history = useHistory<THistory>()
    const [tastings, setTastings] = useState<ITasting[]>([])
    const [isLoading, setIsLoading] = useState<TIsLoading>(true)
    const [errorMessage, setErrorMessage] = useState<TErrorMessage>('')
    const [search, setSearch] = useState<TSearch>('')

    function getTastings() {
        axios
            .get(URL)
            .then((response) => {
                setTastings(response.data)
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
        getTastings()
    }, [])

    function handleFilter(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        setSearch(event.target.value)
    }

    const filteredTastings = tastings.filter((tasting: ITasting) => {
        return tasting.title.toLowerCase().includes(search.toLowerCase())
    })

    if (isLoading) {
        return <h3>Loading data...</h3>
    }

    return (
        <div>
            <h2>List of Tastings</h2>
            <h3>
                <Link to={'/tastings/create/'}>Create new Tasting</Link>
            </h3>
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
                                          {tasting.title}
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
                                      <DeleteTasting tasting={tasting} />
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
