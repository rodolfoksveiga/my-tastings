// Import components, functions, types, variables, and styles
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Alert from 'react-bootstrap/Alert'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import FormikRegister from './FormikRegister'
import registerUser from '../actions/registerUser'
import { TRootState } from '../reducers/rootReducer'


// Types and interfaces
interface IFormData {
    username: string,
    email: string,
    password: string,
    repeatPassword: string
}

interface IRegisterUserProps {
    isAuthenticated: boolean,
    message: string | null,
    didSucceed?: boolean,
    registerUser: Function
}


// Global variables
const initialFormData: IFormData = {
    username: '',
    email: '',
    password: '',
    repeatPassword: ''
}

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        container: {
            padding: theme.spacing(5)
        }
    })
)


// Main component
export function Register({ isAuthenticated, didSucceed, message, registerUser }: IRegisterUserProps) {
    const classes = useStyles()
    const history = useHistory()

    function handleRegister(formData: IFormData) {
        registerUser(formData.username, formData.email, formData.password, formData.repeatPassword)
    }

    if (isAuthenticated) {
        history.push('/')
    }

    return (
        <div>
            <Typography
                variant='h4'
                component='h4'
                align='center'
            >
                Register
            </Typography>
            <Container className={classes.container} maxWidth='xs' >
                <Grid container spacing={5} direction='column' alignItems='center'>
                    {message && (
                        <Grid item>
                            <Alert variant={didSucceed ? 'success' : 'danger'}>{message}</Alert>
                        </Grid>
                    )}
                    <Grid item>
                        <FormikRegister
                            initialFormData={initialFormData}
                            handleSubmit={handleRegister} 
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            href='/'
                            variant='outlined'
                            fullWidth
                        >
                            Go back to Home page
                        </Button>
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

export default connect(mapStateToProps, { registerUser })(Register)
