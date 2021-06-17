// Import components, functions, types, variables, and styles
import { connect } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { makeStyles } from '@material-ui/core/styles'
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

import { stringOrNull, numberOrNull } from './FormikBeverage'
import RegularInputField from './RegularInputField'
import { ITastingForm } from './CreateTasting'
import { TRootState } from '../reducers/rootReducer'
import { IBeverage, TBeverages } from './BeveragesList'

// Types and interfaces
interface ITastingFormikProps {
    initialFormData: ITastingForm
    beverages: TBeverages | null
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

// Main component
export function FormikTasting({
    initialFormData,
    beverages,
    handleSubmit,
}: ITastingFormikProps) {
    const classes = useStyles()

    const FormSchema = Yup.object().shape({
        name: Yup.string().required('You must define a name for your tasting.'),
    })

    let initialBeverage: IBeverage | undefined = undefined
    if (beverages) {
        initialBeverage = beverages.find(
            (item) => item.id === initialFormData.beverage
        )
    }

    return (
        <div>
            <Formik
                initialValues={initialFormData}
                onSubmit={(form) => {
                    form.name = form.name.trim()
                    form.beverage = numberOrNull(Number(form.beverage))
                    form.color = stringOrNull(form.color)
                    form.appearance = stringOrNull(form.appearance)
                    form.aroma = stringOrNull(form.aroma)
                    form.finish = stringOrNull(form.finish)
                    handleSubmit(form)
                }}
                validationSchema={FormSchema}
            >
                {({ setFieldValue, dirty, isValid }) => {
                    return (
                        beverages && (
                            <Form autoComplete="off">
                                <RegularInputField
                                    input="name"
                                    inputLabel="Name"
                                />
                                <Autocomplete
                                    freeSolo
                                    value={initialBeverage}
                                    options={beverages}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(event, value) => {
                                        setFieldValue(
                                            'beverage',
                                            value !== null &&
                                                typeof value !== 'string'
                                                ? value.id
                                                : null
                                        )
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={'Beverage'}
                                            variant="outlined"
                                            margin="dense"
                                            fullWidth
                                        />
                                    )}
                                />
                                <RegularInputField
                                    input="color"
                                    inputLabel="Color"
                                />
                                <RegularInputField
                                    input="appearance"
                                    inputLabel="Appearance"
                                />
                                <RegularInputField
                                    input="aroma"
                                    inputLabel="Aroma"
                                />
                                <RegularInputField
                                    input="finish"
                                    inputLabel="Finish"
                                />
                                <Typography className="text-center mt-2">
                                    Rating
                                </Typography>
                                <Slider
                                    defaultValue={initialFormData.rating}
                                    marks
                                    min={0}
                                    max={10}
                                    step={1}
                                    valueLabelDisplay="auto"
                                    onChange={(event, value) => {
                                        setFieldValue('rating', value)
                                    }}
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
})

export default connect(mapStateToProps)(FormikTasting)
