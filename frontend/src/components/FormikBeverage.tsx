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
import { TBeverages } from './BeveragesList'
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

// Global variables
const useStyles = makeStyles((theme) => ({
    submitButtons: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        color: theme.palette.common.black,
    },
    saveButton: {
        '&:hover': {
            color: theme.palette.success.main,
            borderColor: theme.palette.success.main,
        },
    },
    resetButton: {
        '&:hover': {
            color: theme.palette.warning.main,
            borderColor: theme.palette.warning.main,
        },
    },
}))

export function stringOrNull(value: string | null) {
    return value === '' || value === null ? null : value.trim()
}

export function numberOrNull(value: number | string | null) {
    return value === 0 || value === null ? null : value
}

// Main component
export function FormikBeverage({
    initialFormData,
    beverages,
    producers,
    categories,
    handleSubmit,
}: IBeverageFormikProps) {
    const classes = useStyles()

    const FormSchema = Yup.object().shape({
        name: Yup.string().trim().required('You must define a beverage name.'),
        year: Yup.number()
            .min(0, 'Minimum value exceeded.')
            .max(2021, 'Maximum value exceeded.'),
        volume: Yup.number()
            .min(100, 'Minimum value exceeded.')
            .max(1000000, 'Maximum value exceeded.')
            .test(
                'maxDigitsAfterDecimal',
                'Value must be integer.',
                (n) => Number.isInteger(n && n) || n !== 0
            ),
        degree: Yup.number()
            .min(0, 'Minimum value exceeded.')
            .max(100, 'Maximum value exceeded.')
            .test(
                'maxDigitsAfterDecimal',
                'Max. 2 decimals allowed.',
                (n) => Number.isInteger(n && n * 10 ** 2) || n !== 0
            ),
        price: Yup.number()
            .min(0, 'Minimum value exceeded.')
            .max(100000, 'Maximum value exceeded.')
            .test(
                'maxDigitsAfterDecimal',
                'Max. 2 decimals allowed.',
                (n) => Number.isInteger(n && n * 10 ** 2) || n !== 0
            ),
    })

    let initialProducer: IProducer | undefined = undefined
    let initialCategory: ICategory | undefined = undefined
    if (beverages && producers && categories) {
        initialProducer = producers.find(
            (item) => item.id === initialFormData.producer
        )
        initialCategory = categories.find(
            (item) => item.id === initialFormData.category
        )
    }

    return (
        <div>
            <Formik
                initialValues={initialFormData}
                onSubmit={(form) => {
                    form.name = form.name.trim()
                    form.category = numberOrNull(Number(form.category))
                    form.producer = numberOrNull(Number(form.producer))
                    form.classification = stringOrNull(form.classification)
                    form.base = stringOrNull(form.base)
                    form.year = numberOrNull(Number(form.year))
                    form.degree = stringOrNull(form.degree)
                    form.price = stringOrNull(form.price)
                    form.volume = numberOrNull(Number(form.volume))
                    handleSubmit(form)
                }}
                validationSchema={FormSchema}
            >
                {({ setFieldValue, dirty, isValid }) => {
                    return (
                        beverages &&
                        producers &&
                        categories && (
                            <Form autoComplete="off">
                                <RegularInputField
                                    input="name"
                                    inputLabel="Name"
                                />
                                <Autocomplete
                                    freeSolo
                                    value={initialProducer}
                                    options={producers}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(e, value) => {
                                        setFieldValue(
                                            'producer',
                                            value !== null &&
                                                typeof value !== 'string'
                                                ? value.id
                                                : null
                                        )
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={'Producer'}
                                            variant="outlined"
                                            margin="dense"
                                            fullWidth
                                        />
                                    )}
                                />
                                <Autocomplete
                                    freeSolo
                                    value={initialCategory}
                                    options={categories}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(e, value) => {
                                        setFieldValue(
                                            'category',
                                            value !== null &&
                                                typeof value !== 'string'
                                                ? value.id
                                                : null
                                        )
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={'Category'}
                                            variant="outlined"
                                            margin="dense"
                                            fullWidth
                                        />
                                    )}
                                />
                                <RegularInputField
                                    input="classification"
                                    inputLabel="Classification"
                                />
                                <RegularInputField
                                    input="base"
                                    inputLabel="Base"
                                />
                                <RegularInputField
                                    input="year"
                                    inputLabel="Year"
                                    type="number"
                                />
                                <RegularInputField
                                    input="volume"
                                    inputLabel="Volume (mL)"
                                    type="number"
                                />
                                <RegularInputField
                                    input="degree"
                                    inputLabel="Percentage of alcohol (%)"
                                    type="let"
                                />
                                <RegularInputField
                                    input="price"
                                    inputLabel="Price ($)"
                                    type="let"
                                />
                                <Grid item>
                                    <ButtonGroup
                                        className={classes.submitButtons}
                                        fullWidth
                                    >
                                        <Button
                                            className={classes.saveButton}
                                            type="submit"
                                            variant="outlined"
                                            disabled={!dirty || !isValid}
                                            startIcon={<SaveOutlinedIcon />}
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            className={classes.resetButton}
                                            type="reset"
                                            variant="outlined"
                                            disabled={!dirty}
                                            startIcon={
                                                initialFormData.id ? (
                                                    <HistoryOutlinedIcon />
                                                ) : (
                                                    <ClearAllOutlinedIcon />
                                                )
                                            }
                                        >
                                            {initialFormData.id
                                                ? 'Reset'
                                                : 'Clear'}
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
    categories: state.categories.data,
})

export default connect(mapStateToProps)(FormikBeverage)
