// Import components, functions, types, variables, and styles
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import RegularInputField from './RegularInputField'


// Types and interfaces
interface IFormikResetPasswordProps {
    initialFormData: {
        email: string
    }
    handleSubmit: Function
}


// Validation schema
const FormSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email.')
        .required('Required field.')
})

// Main component
export default function FormikResetPassword({initialFormData, handleSubmit}: IFormikResetPasswordProps) {
    return (
        <div>
            <Formik
                initialValues={initialFormData}
                onSubmit={form => handleSubmit(form)}
                validationSchema={FormSchema}
            >
                {({dirty, isValid}) => {
                    return(
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <RegularInputField input='email' inputLabel='Email' />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type='submit'
                                        variant='outlined'
                                        color='primary'
                                        disabled={!dirty || !isValid}
                                        fullWidth
                                    >
                                        Reset Password
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}
