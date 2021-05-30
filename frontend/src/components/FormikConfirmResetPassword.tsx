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
        .min(8, 'Password must be at least 8 characters long.')
        .matches(/\w*[a-z]\w*/,  'Password must have a small letter.')
        .matches(/\w*[A-Z]\w*/,  'Password must have a capital letter.')
        .matches(/^\S*$/, 'Password must not have any white space.')
        .matches(/\d/, 'Password must have a number.')
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
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <InputField input='newPassword' inputLabel='New password' type='password' />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <InputField input='repeatNewPassword' inputLabel='Repeat new password' type='password' />
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
                                        Change Password
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



