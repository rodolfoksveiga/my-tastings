import React from 'react'
import {useState, useReducer, ChangeEvent, FormEvent} from 'react'
import Tasting from './Tasting'

// Actions
type Actions =
    {type: 'CREATE_TASTING'; payload: ITastingRaw}
  | {type: 'DELETE_TASTING'; payload: ITasting};

// Interfaces
interface ITastingsProps {}

interface ITastingRaw {
    name: string;
    category: string;
    producer: string;
    rating: number;
    color: string;
    appearance: string;
    aroma: string;
    finish: string;
    price: number;
}

export interface ITasting extends ITastingRaw {
    added: string;
}

// Initializer
const initialState: ITasting[] = []

// Functions
function newTasting(tasting: ITastingRaw
): ITasting {
    return {
        added: new Date(Date.now()).toUTCString(),
        ...tasting
    }
}

// Reducers
function tastingReducer(tastings: typeof initialState, action: Actions) {
    switch (action.type) {
        case 'CREATE_TASTING':
            return [
                ...tastings,
                newTasting(action.payload)
            ]
        case 'DELETE_TASTING':
            return tastings.filter(tasting => {
                return tasting.added !== action.payload.added
            })
        default:
            return tastings
    }
}

// Component
const Tastings: React.FunctionComponent<ITastingsProps> = () => {
    const [tastings, dispatch] = useReducer(tastingReducer, initialState)
    const [name, setName] = useState<string>('')
    const [category, setCategory] = useState<string>('')
    const [producer, setProducer] = useState<string>('')
    const [rating, setRating] = useState<number>(1)
    const [color, setColor] = useState<string>('')
    const [appearance, setAppearance] = useState<string>('')
    const [aroma, setAroma] = useState<string>('')
    const [finish, setFinish] = useState<string>('')
    const [price, setPrice] = useState<number>(0.00)

    function createTasting(e: FormEvent<HTMLFormElement>) {
        const payload = {
            name: name,
            category: category,
            producer: producer,
            rating: rating,
            color: color,
            appearance: appearance,
            aroma: aroma,
            finish: finish,
            price: price
        }

        e.preventDefault()
        
        dispatch({type: 'CREATE_TASTING', payload: payload})

        setName('')
        setCategory('')
        setProducer('')
        setRating(1)
        setColor('')
        setAppearance('')
        setAroma('')
        setFinish('')
        setPrice(0.00)
    }

    function handleName(e: ChangeEvent<HTMLInputElement>) {
        setName(e.target.value)
    }

    function handleCategory(e: ChangeEvent<HTMLInputElement>) {
        setCategory(e.target.value)
    }

    function handleProducer(e: ChangeEvent<HTMLInputElement>) {
        setProducer(e.target.value)
    }

    function handleRating(e: ChangeEvent<HTMLInputElement>) {
        setRating(parseInt(e.target.value))
    }

    function handleColor(e: ChangeEvent<HTMLInputElement>) {
        setColor(e.target.value)
    }

    function handleAppearance(e: ChangeEvent<HTMLInputElement>) {
        setAppearance(e.target.value)
    }

    function handleAroma(e: ChangeEvent<HTMLInputElement>) {
        setAroma(e.target.value)
    }

    function handleFinish(e: ChangeEvent<HTMLInputElement>) {
        setFinish(e.target.value)
    }

    function handlePrice(e: ChangeEvent<HTMLInputElement>) {
        setPrice(parseFloat(e.target.value))    
    }

    return (
        <div>
            <form onSubmit={createTasting}>
                Name: <input value={name} onChange={handleName} type='text' />
                <br />
                Category: <input value={category} onChange={handleCategory} type='text' />
                <br />
                Producer: <input value={producer} onChange={handleProducer} type='text' />
                <br />
                Rating: <input value={rating} onChange={handleRating} type='number' min={1} max={5} />
                <br />
                Color: <input value={color} onChange={handleColor} type='text' />
                <br />
                Appearance: <input value={appearance} onChange={handleAppearance} type='text' />
                <br />
                Aroma: <input value={aroma} onChange={handleAroma} type='text' />
                <br />
                Finish: <input value={finish} onChange={handleFinish} type='text' />
                <br />
                Price: <input value={price} onChange={handlePrice} type='number' min={0.00} max={9999.99} step={0.01} />
                <br />
                <br />
                <input id='submit-button' type='submit' value='Create'/>
            </form>
            {tastings.map(tasting => {
                return <Tasting key={tasting.added} tasting={tasting} dispatch={dispatch} />
            })}
        </div>
    )
}

export default Tastings