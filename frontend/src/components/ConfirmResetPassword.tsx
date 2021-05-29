// Import components, functions, types, variables, and styles
import { useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import FormikConfirmResetPassword from './FormikConfirmResetPassword'
import confirmResetPassword from '../actions/confirmResetPassword'


// Types and interfaces
interface IFormData {
    newPassword: string
    repeatNewPassword: string
}

interface IResetPasswordProps {
    confirmResetPassword: Function
}

interface IConfirmResetPasswordParams {
    userId: string
    token: string
}


// Global variables
const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(5),
    }
}))

const initialFormData: IFormData = {
    newPassword: '',
    repeatNewPassword: ''
}


// Main component
export function ConfirmResetPassword({ confirmResetPassword }: IResetPasswordProps) {
    const { userId, token } = useParams<IConfirmResetPasswordParams>()
    const classes = useStyles()
    const history = useHistory()

    function handleConfirmResetPassword(formData: IFormData) {
        confirmResetPassword(userId, token, formData.newPassword, formData.repeatNewPassword)
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
                    <Grid item >
                        <FormikConfirmResetPassword
                            initialFormData={initialFormData}
                            handleSubmit={handleConfirmResetPassword} 
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

export default connect(null, { confirmResetPassword })(ConfirmResetPassword)
