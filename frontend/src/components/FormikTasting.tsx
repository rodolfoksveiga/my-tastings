// Import components, functions, types, variables, and styles
import {useEffect } from 'react'
import { connect } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Slider from '@material-ui/core/Slider'
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined'
import ClearAllOutlinedIcon from '@material-ui/icons/ClearAllOutlined'
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined'

import RegularInputField from './RegularInputField'
import fetchBeveragesList from '../actions/fetchBeveragesList'
import { ITastingFormFake } from './CreateTasting'
import { TRootState } from '../reducers/rootReducer'
import { IBeverage, TBeverages } from './BeveragesList'


// Types and interfaces
interface ITastingFormikProps {
    initialFormData: ITastingFormFake
    userId?: number
    beverages: TBeverages | null
    handleSubmit: Function
    fetchBeveragesList: Function
}


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
export function FormikTasting({initialFormData, userId, beverages, handleSubmit, fetchBeveragesList}: ITastingFormikProps) {
    useEffect(() => {
        fetchBeveragesList()
    }, [fetchBeveragesList])

    let initialBeverage: IBeverage | null | undefined = null
    if (beverages) {
        initialBeverage = beverages.find(item => item.name === initialFormData.beverageName)
    }

    return (
        <div>
            <Formik
                initialValues={initialFormData}
                onSubmit={form => handleSubmit(form, userId)}
                validationSchema={FormSchema}
            >
                {({dirty, isValid}) => {
                    return(
                        <Form>
                            <RegularInputField input='name' inputLabel='Name' />
                            {beverages && (
                                <Autocomplete
                                    freeSolo
                                    value={initialBeverage}
                                    options={beverages}
                                    getOptionLabel={option => option.name}
                                    style={{ width: 300 }}
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            label='Beverage'
                                            variant='outlined'
                                            margin='dense'
                                            fullWidth
                                            />
                                    )}
                                />
                            )}
                            <RegularInputField input='color' inputLabel='Color' />
                            <RegularInputField input='appearance' inputLabel='Appearance' />
                            <RegularInputField input='aroma' inputLabel='Aroma' />
                            <RegularInputField input='finish' inputLabel='Finish' />
                            <Typography className='text-center mt-2'>
                                Rating
                            </Typography>
                            <Slider
                                defaultValue={initialFormData.rating}
                                marks
                                min={0}
                                max={10}
                                step={1}
                                valueLabelDisplay='auto'
                            />
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
                                            initialFormData.id
                                            ? <HistoryOutlinedIcon />
                                            : <ClearAllOutlinedIcon />
                                        }
                                    >
                                        {initialFormData.id ? 'Reset' : 'Clear'}
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



// Connect to Redux
const mapStateToProps = (state: TRootState) => ({
    userId: state.authUser.user?.id,
    beverages: state.beverages.data
})

export default connect(mapStateToProps, { fetchBeveragesList })(FormikTasting)
