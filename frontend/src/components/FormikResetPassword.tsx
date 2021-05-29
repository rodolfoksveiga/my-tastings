// Import components, functions, types, variables, and styles
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import InputField from './InputField'


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
                            <InputField input='email' inputLabel='Email' />
                            <Grid
                                item
                            >
                                <Button
                                    type='submit'
                                    variant='outlined'
                                    color='secondary'
                                    disabled={!dirty || !isValid}
                                >
                                    Reset Password
                                </Button>
                            </Grid>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}
