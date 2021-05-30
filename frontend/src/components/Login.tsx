// Import components, functions, types, variables, and styles
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import Alert from 'react-bootstrap/Alert'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import FormikLogin from './FormikLogin'
import loginUser from '../actions/loginUser'
import { TRootState } from '../reducers/rootReducer'


// Types and interfaces
interface IFormData {
    username: string
    password: string
}

interface ILoginUserProps {
    isAuthenticated: boolean
    didSucceed?: boolean
    message: string | null
    loginUser: Function
}


// Global variables
const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(5),
    }
}))

const initialFormData: IFormData = {
    username: '',
    password: ''
}


// Main component
export function Login({ isAuthenticated, didSucceed, message, loginUser }: ILoginUserProps) {
    const classes = useStyles()
    const history = useHistory()

    function handleLogin(formData: IFormData) {
        loginUser(formData.username, formData.password)
    }

    if (isAuthenticated) {
        history.push('/')
    }

    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <Container className={classes.container} maxWidth="xs" >
                <Grid container spacing={5} direction='column' alignItems='center'>
                    {message && (
                        <Grid item>
                            <Alert variant={didSucceed ? 'success' : 'danger'}>{message}</Alert>
                        </Grid>
                    )}
                    <Grid item>
                        <FormikLogin
                            initialFormData={initialFormData}
                            handleSubmit={handleLogin} 
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            href='/register/'
                            variant='outlined'
                            fullWidth
                        >
                            Register
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        Forgot your password? <Link to='/reset-password'>Reset password!</Link>
                    </Grid>
                </Grid>
            </Container>
        </div>

    )
}


// Connect to Redux
const mapStateToProps = (state: TRootState) => ({
    isAuthenticated: state.authUser.isAuthenticated,
    didSucceed: state.authUser.didSucceed,
    message: state.authUser.message
})

export default connect(mapStateToProps, { loginUser })(Login)
