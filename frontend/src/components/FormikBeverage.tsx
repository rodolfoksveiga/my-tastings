// Import components, functions, types, variables, and styles
import { connect } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { makeStyles } from '@material-ui/core/styles'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined'
import ClearAllOutlinedIcon from '@material-ui/icons/ClearAllOutlined'
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined'

import RegularInputField from './RegularInputField'
import { IBeverageForm } from './CreateBeverage'
import { TRootState } from '../reducers/rootReducer'
import { IBeverage, TBeverages } from './BeveragesList'
import { IProducer, TProducers } from './ProducersList'
import { ICategory, TCategories } from './CategoriesList'


// Types and interfaces
interface IBeverageFormikProps {
    initialFormData: IBeverageForm
    beverages: TBeverages | null
    producers: TProducers | null
    categories: TCategories | null
    handleSubmit: Function
}


// Validation schema
const FormSchema = Yup.object().shape({
    name: Yup.string()
        .min(1, 'Too short!')
        .required('Required')
})


// Global variables
const useStyles = makeStyles(theme => ({
    submitButtons: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        color: theme.palette.common.black
    },
    saveButton: {
        '&:hover': {
            color: theme.palette.success.main,
            borderColor: theme.palette.success.main
        }
    },
    resetButton: {
        '&:hover': {
            color: theme.palette.warning.main,
            borderColor: theme.palette.warning.main
        }
    }
}))


// Main component
export function FormikBeverage({
    initialFormData,
    beverages,
    producers,
    categories,
    handleSubmit
}: IBeverageFormikProps) {
    const classes = useStyles()

    let initialBeverage: IBeverage | undefined = undefined
    let initialProducer: IProducer | undefined = undefined
    let initialCategory: ICategory | undefined = undefined
    if (beverages && producers && categories) {
        initialBeverage = beverages.find(item => item.id === initialFormData.id)
        initialProducer = producers.find(item => item.id === initialFormData.producer)
        initialCategory = categories.find(item => item.id === initialFormData.category)
    }

    return (
        <div>
            <Formik
                initialValues={initialFormData}
                onSubmit={form => handleSubmit(form)}
                validationSchema={FormSchema}
            >
                {({setFieldValue, dirty, isValid}) => {
                    return(
                        (beverages && producers && categories) && (
                            <Form autoComplete='off'>
                                <RegularInputField input='name' inputLabel='Name' />
                                <Autocomplete
                                    freeSolo
                                    value={initialProducer}
                                    options={producers}
                                    getOptionLabel={option => option.name}
                                    onChange={(e, value) => {
                                        setFieldValue(
                                            'producer',
                                            value !== null && typeof value !== 'string' ? value.id : null
                                        )
                                    }}
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            label={'Producer'}
                                            variant='outlined'
                                            margin='dense'
                                            fullWidth
                                            />
                                    )}
                                />
                                <Autocomplete
                                    freeSolo
                                    value={initialCategory}
                                    options={categories}
                                    getOptionLabel={option => option.name}
                                    onChange={(e, value) => {
                                        setFieldValue(
                                            'category',
                                            value !== null && typeof value !== 'string' ? value.id : null
                                        )
                                    }}
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            label={'Category'}
                                            variant='outlined'
                                            margin='dense'
                                            fullWidth
                                            />
                                    )}
                                />
                                <Autocomplete
                                    freeSolo
                                    value={initialBeverage}
                                    options={beverages}
                                    getOptionLabel={option => option.classification}
                                    onChange={(e, value) => {
                                        setFieldValue(
                                            'classification',
                                            value !== null && typeof value !== 'string' ? value.classification : null
                                        )
                                    }}
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            label={'Classification'}
                                            variant='outlined'
                                            margin='dense'
                                            fullWidth
                                            />
                                    )}
                                />
                                <Autocomplete
                                    freeSolo
                                    value={initialBeverage}
                                    options={beverages}
                                    getOptionLabel={option => option.base}
                                    onChange={(e, value) => {
                                        setFieldValue(
                                            'base',
                                            value !== null && typeof value !== 'string' ? value.base : null
                                        )
                                    }}
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            label={'Base'}
                                            variant='outlined'
                                            margin='dense'
                                            fullWidth
                                            />
                                    )}
                                />
                                <RegularInputField input='year' inputLabel='Year' />
                                <RegularInputField input='volume' inputLabel='Volume' type='let' />
                                <RegularInputField input='degree' inputLabel='Degree' type='let' />
                                <RegularInputField input='price' inputLabel='Price' type='let' />
                                <Grid item>
                                    <ButtonGroup className={classes.submitButtons} fullWidth>
                                        <Button
                                            className={classes.saveButton}
                                            type='submit'
                                            variant='outlined'
                                            disabled={!dirty || !isValid}
                                            startIcon={<SaveOutlinedIcon />}
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            className={classes.resetButton}
                                            type='reset'
                                            variant='outlined'
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
                    )
                }}
            </Formik>
        </div>
    )
}



// Connect to Redux
const mapStateToProps = (state: TRootState) => ({
    beverages: state.beverages.data,
    producers: state.producers.data,
    categories: state.categories.data
})

export default connect(mapStateToProps)(FormikBeverage)
