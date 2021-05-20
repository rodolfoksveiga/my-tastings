// Import components, functions, types, variables, and styles
import axios from 'axios'

import { URL, ITasting } from './Tastings'

interface IDeleteTastingProps {
    tasting: ITasting
    updateTriggerReload: Function
}

// Main component
export default function DeleteTasting(props: IDeleteTastingProps) {
    function handleDelete() {
        if (window.confirm('Are you sure you want to delete this Tasting?')) {
            axios
                .delete(URL + props.tasting.id, { data: props.tasting })
                .then(() => {
                    alert('Tasting was deleted!')
                    props.updateTriggerReload()
                })
                .catch((error) => {
                    console.log(error)
                    alert('Error while deleting the Tasting.')
                })
        }
    }

    return <button onClick={handleDelete}>Delete Tasting</button>
}
