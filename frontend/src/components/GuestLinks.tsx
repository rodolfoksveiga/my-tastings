// Import components, functions, types, variables, and styles
import { Fragment } from 'react'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'


// Global variables
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        navBarLinks: {
            '&:hover': {
                color: theme.palette.common.white
            }
        }
    })
)


// Component
export default function GuestLinks() {
    const classes = useStyles()
    
    return(
        <Fragment>
            <Button className={classes.navBarLinks} href='/login/'>Login</Button>
            <Button className={classes.navBarLinks} href='/register/'>Register</Button>
        </Fragment>
    )
}