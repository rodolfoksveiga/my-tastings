// Import components, functions, types, variables, and styles
import { Fragment } from 'react'

import Button from '@material-ui/core/Button'


// Types and interfaces
interface IUserLinksProps {
    handleLogout: Function
}


// Component
export default function UserLinks({ handleLogout }: IUserLinksProps) {
    return(
        <Fragment>
            <Button href='/tastings/'>Tastings</Button>
            <Button href='/beverages/'>Beverages</Button>
            <Button href='/tastings/'>Producers</Button>
            <Button href='/login/' onClick={() => handleLogout()}>Logout</Button>
        </Fragment>
    )
}