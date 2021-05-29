// Import components, functions, types, variables, and styles
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import InputField from './InputField'


// Types and interfaces
interface IFormikConfirmResetPasswordProps {
    initialFormData: {
        newPassword: string
        repeatNewPassword: string
    }
    handleSubmit: Function
}


// Validation schema
const FormSchema = Yup.object().shape({
    newPassword: Yup.string()
    .min(6, 'Your password must have at least 6 characters.')
    .required('Required'),
    repeatNewPassword: Yup.string()
     .oneOf([Yup.ref('newPassword'), null], 'Passwords must match.')
})

// Main component
export default function FormikResetPassword({initialFormData, handleSubmit}: IFormikConfirmResetPasswordProps) {
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
                            <InputField input='newPassword' inputLabel='New password' type='password' />
                            <InputField input='repeatNewPassword' inputLabel='Repeat new password' type='password' />
                            <Grid
                                item
                            >
                                <Button
                                    type='submit'
                                    variant='outlined'
                                    color='secondary'
                                    disabled={!dirty || !isValid}
                                >
                                    Change Password
                                </Button>
                            </Grid>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}
