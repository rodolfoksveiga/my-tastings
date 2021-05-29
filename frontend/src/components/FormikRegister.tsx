// Import components, functions, types, variables, and styles
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import InputField from './InputField'


// Types and interfaces
interface IRegisterFormik {
    initialFormData: {
        username: string
        password: string
    }
    handleSubmit: Function
}


// Validation schema
const FormSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, 'Your username is at least 3 characters long.')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email.')
        .required('Required field.'),
    password: Yup.string()
        .min(6, 'Your password must have at least 6 characters.')
        .required('Required'),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match.')
})

// Main component
export default function FormikRegister({initialFormData, handleSubmit}: IRegisterFormik) {
    return (
        <div>
            <Formik
                initialValues={initialFormData}
                onSubmit={formData => handleSubmit(formData)}
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
                                            <InputField input='email' inputLabel='Email' />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <InputField input='password' inputLabel='Password' type='password' />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <InputField input='repeatPassword' inputLabel='Repeat password' type='password' />
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
                                        Register
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
