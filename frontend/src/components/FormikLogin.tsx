// Import components, functions, types, variables, and styles
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import InputField from './InputField'


// Types and interfaces
interface ILoginFormikProps {
    initialFormData: {
        username: string
        password: string
    }
    handleSubmit: Function
}


// Validation schema
const FormSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, 'Username must be at least 3 characters long.')
        .matches(/^[a-zA-Z]/, 'Username must start a letter.')
        .matches(/^\S*$/, 'Username must not have any white space.')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters long.')
        .matches(/^\S*$/, 'Password must not have any white space.')
        .required('Required'),
})

// Main component
export default function FormikLogin({initialFormData, handleSubmit}: ILoginFormikProps) {
    return (
        <div>
            <Formik
                initialValues={initialFormData}
                onSubmit={(formData, {resetForm}) => {
                    handleSubmit(formData)
                    resetForm()
                }}
                validationSchema={FormSchema}
            >
                {({dirty, isValid}) => {
                    return(
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <InputField input='username' inputLabel='Username' />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <InputField input='password' inputLabel='Password' type='password' />
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
                                        Login
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
