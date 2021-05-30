// Import components, functions, types, variables, and styles
import { useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import Alert from 'react-bootstrap/Alert'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import activateUser from '../actions/activateUser'
import { TRootState } from '../reducers/rootReducer'


// Types and interfaces

interface IActivateUserProps {
    message: string | null,
    didSucceed?: boolean,
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
export function Activate({ didSucceed, message, activateUser }: IActivateUserProps) {
    const { userId, token } = useParams<IActivateUserParams>()
    const classes = useStyles()
    const history = useHistory()

    function handleActivateUser() {
        activateUser(userId, token)
    }

    if (didSucceed === true) {
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
                {didSucceed === false && (
                        <Grid>
                            <Alert variant='danger'>{message}</Alert>
                        </Grid>
                    )}
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
                            href='/login/'
                            variant='outlined'
                            onClick={() => history.push('/')}
                            fullWidth
                        >
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>

    )
}


// Connect to Redux
const mapStateToProps = (state: TRootState) => ({
    didSucceed: state.authUser.didSucceed,
    message: state.authUser.message
})

export default connect(mapStateToProps, { activateUser })(Activate)
