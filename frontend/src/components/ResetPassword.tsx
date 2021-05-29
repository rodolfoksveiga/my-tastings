// Import components, functions, types, variables, and styles
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import FormikResetPassword from './FormikResetPassword'
import resetPassword from '../actions/resetPassword'


// Types and interfaces
interface IFormData {
    email: string
}

interface IResetPasswordProps {
    isAuthenticated: boolean,
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
export function ResetPassword({ resetPassword }: IResetPasswordProps) {
    const classes = useStyles()
    const history = useHistory()

    function handleResetPassword(formData: IFormData) {
        resetPassword(formData.email)
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
                        <FormikResetPassword
                            initialFormData={initialFormData}
                            handleSubmit={handleResetPassword} 
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            href='/register/'
                            variant='outlined'
                            fullWidth
                        >
                            Go back to login page
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>

    )
}

export default connect(null, { resetPassword })(ResetPassword)
