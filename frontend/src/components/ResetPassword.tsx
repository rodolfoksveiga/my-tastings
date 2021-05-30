// Import components, functions, types, variables, and styles
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import Alert from 'react-bootstrap/Alert'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import FormikResetPassword from './FormikResetPassword'
import resetPassword from '../actions/resetPassword'
import { TRootState } from '../reducers/rootReducer'


// Types and interfaces
interface IFormData {
    email: string
}

interface IResetPasswordProps {
    message: string | null
    resetPassword: Function
}


// Global variables
const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(5),
    }
}))

const initialFormData: IFormData = {
    email: ''
}


// Main component
export function ResetPassword({ message, resetPassword }: IResetPasswordProps) {
    const classes = useStyles()

    function handleResetPassword(formData: IFormData) {
        resetPassword(formData.email)
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
                            <Alert variant='warning'>{message}</Alert>
                        </Grid>
                    )}
                    <Grid item>
                        <FormikResetPassword
                            initialFormData={initialFormData}
                            handleSubmit={handleResetPassword} 
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
    message: state.authUser.message
})

export default connect(mapStateToProps, { resetPassword })(ResetPassword)
