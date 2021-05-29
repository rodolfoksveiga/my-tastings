// Import components, functions, types, variables, and styles
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined'
import ClearAllOutlinedIcon from '@material-ui/icons/ClearAllOutlined'
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined'

import InputField from './InputField'
import { ITastingFormik } from './types'


// Validation schema
const FormSchema = Yup.object().shape({
    name: Yup.string()
        .min(1, 'Too short!')
        .required('Required'),
    color: Yup.string()
        .min(1, 'Too short!')
        .required('Required'),
    appearance: Yup.string()
        .min(1, 'Too short!')
        .required('Required'),
    aroma: Yup.string()
        .min(1, 'Too short!')
        .required('Required'),
    finish: Yup.string()
        .min(1, 'Too short!')
        .required('Required'),
    rating: Yup.string()
        .min(1, 'Too short!')
        .required('Required')
})

// Main component
export default function FormikTasting({initialForm, handleSubmit}: ITastingFormik) {
    return (
        <div>
            <Formik
                initialValues={initialForm}
                onSubmit={form => handleSubmit(form)}
                validationSchema={FormSchema}
            >
                {({dirty, isValid}) => {
                    return(
                        <Form>
                            <InputField input='name' inputLabel='Name' />
                            <InputField input='beverage' inputLabel='Beverage' type='let' />
                            <InputField input='user' inputLabel='User' type='let'/>
                            <InputField input='color' inputLabel='Color' />
                            <InputField input='appearance' inputLabel='Appearance' />
                            <InputField input='aroma' inputLabel='Aroma' />
                            <InputField input='finish' inputLabel='Finish' />
                            <InputField input='rating' inputLabel='Rating' type='let' />
                            <Grid
                                item
                            >
                                <ButtonGroup
                                    fullWidth
                                >
                                    <Button
                                        type='submit'
                                        variant='outlined'
                                        color='primary'
                                        disabled={!dirty || !isValid}
                                        startIcon={<SaveOutlinedIcon />}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        type='reset'
                                        variant='outlined'
                                        color='secondary'
                                        disabled={!dirty}
                                        startIcon={
                                            initialForm.id
                                            ? <HistoryOutlinedIcon />
                                            : <ClearAllOutlinedIcon />
                                        }
                                    >
                                        {initialForm.id ? 'Reset' : 'Clear'}
                                    </Button>
                                </ButtonGroup>
                            </Grid>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}
