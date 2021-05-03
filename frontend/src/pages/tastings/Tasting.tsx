import React from 'react'
import {ITasting} from './Tastings'

// Interfaces
interface ITastingProps {
    tasting: ITasting,
    dispatch: Function
}

// Component
const Tasting: React.FunctionComponent<ITastingProps> = ({tasting, dispatch}) => {
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

export default Tasting