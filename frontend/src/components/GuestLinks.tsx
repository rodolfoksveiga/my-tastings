// Import components, functions, types, variables, and styles
import { Fragment } from 'react'

import Button from '@material-ui/core/Button'


// Component
export default function GuestLinks() {
    return(
        <Fragment>
            <Button href='/login/'>Login</Button>
            <Button href='/register/'>Register</Button>
        </Fragment>
    )
}