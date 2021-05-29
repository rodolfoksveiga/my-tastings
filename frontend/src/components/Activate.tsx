// Import components, functions, types, variables, and styles
import { useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import activateUser from '../actions/activateUser'


// Types and interfaces

interface IActivateUserProps {
    activateUser: Function
}

interface IActivateUserParams {
    userId: string
    token: string
}


// Global variables
const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(5),
    }
}))


// Main component
export function Activate({ activateUser }: IActivateUserProps) {
    const { userId, token } = useParams<IActivateUserParams>()
    const classes = useStyles()
    const history = useHistory()

    function handleActivateUser() {
        activateUser(userId, token)
        history.push('/login/')
    }

    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <Container className={classes.container} maxWidth="xs" >
                <Grid container spacing={5} direction='column' alignItems='center'>
                    <Grid item xs={12}>
                        <Button
                            variant='outlined'
                            color='primary'
                            onClick={handleActivateUser}
                            fullWidth
                        >
                            Activate account
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            href='/'
                            variant='outlined'
                            onClick={handleActivateUser}
                            fullWidth
                        >
                            Go to the home page
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>

    )
}


// Connect to Redux
export default connect(null, { activateUser })(Activate)
