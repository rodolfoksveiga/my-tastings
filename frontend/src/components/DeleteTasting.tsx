// Import components, functions, types, variables, and styles
import axios from 'axios'

import { ITasting } from './Tastings'

interface IDeleteTasting {
    tasting: ITasting
}

// Main component
export default function DeleteTasting(props: IDeleteTasting) {
    function handleDelete() {
        if (window.confirm('Are you sure you want to delete the Tasting?')) {
            axios
                .delete(
                    `https://jsonplaceholder.typicode.com/posts/${props.tasting.id}`,
                    { data: props.tasting }
                )
                .then((response) => {
                    console.log(response)
                    alert('Tasting was deleted!')
                })
                .catch((error) => {
                    console.log(error)
                    alert('Error while deleting the Tasting.')
                })
        }
    }

    return <button onClick={handleDelete}>Delete Tasting</button>
}
