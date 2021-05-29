// Import components, functions, types, variables, and styles
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

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
    registerUser: Function
}


// Global variables
const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(5),
    }
}))

const initialFormData: IFormData = {
    username: '',
    email: '',
    password: '',
    repeatPassword: ''
}


// Main component
export function Register({ isAuthenticated, registerUser }: IRegisterUserProps) {
    const classes = useStyles()
    const history = useHistory()

    function handleRegister(formData: IFormData) {
        registerUser(formData.username, formData.email, formData.password, formData.repeatPassword)
        history.push('/')
        
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
                    <Grid item >
                        <FormikRegister
                            initialFormData={initialFormData}
                            handleSubmit={handleRegister} 
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            href='/login/'
                            variant='outlined'
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
    isAuthenticated: state.authUser.isAuthenticated
})

export default connect(mapStateToProps, { registerUser })(Register)
