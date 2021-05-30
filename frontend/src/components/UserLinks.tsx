// Import components, functions, types, variables, and styles
import { Fragment } from 'react'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'


// Types and interfaces
interface IUserLinksProps {
    handleLogout: Function
}


// Component
export default function UserLinks({ handleLogout }: IUserLinksProps) {
    return(
        <Fragment>
            <Button href='/tastings/'>Tastings</Button>
            <Button href='/login/' onClick={() => handleLogout()}>Logout</Button>
        </Fragment>
    )
}