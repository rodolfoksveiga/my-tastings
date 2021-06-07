// Import components, functions, types, variables, and styles
import { connect } from 'react-redux'
import { Formik, Form, ErrorMessage } from 'formik'
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

import RegularInputField from './RegularInputField'
import { ITastingForm } from './CreateTasting'
import { TRootState } from '../reducers/rootReducer'
import { ITasting, TTastings } from './TastingsList'
import { IBeverage, TBeverages } from './BeveragesList'


// Types and interfaces
interface ITastingFormikProps {
    initialFormData: ITastingForm
    tastings: TTastings | null
    beverages: TBeverages | null
    handleSubmit: Function
}


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
export function FormikTasting({
    initialFormData,
    tastings,
    beverages,
    handleSubmit
}: ITastingFormikProps) {
    const classes = useStyles()

    const FormSchema = Yup.object().shape({
        name: Yup.string()
            .required('You must define a name for your tasting.')
    })

    let initialTasting: ITasting | undefined = undefined
    let initialBeverage: IBeverage | undefined = undefined
    if (tastings && beverages) {
        initialTasting = tastings.find(item => item.id === initialFormData.id)
        initialBeverage = beverages.find(item => item.id === initialFormData.beverage)
    }

    return (
        <div>
            <Formik
                initialValues={initialFormData}
                onSubmit={form => {
                    form.name = form.name.trim()
                    handleSubmit(form)
                }}
                validationSchema={FormSchema}
            >
                {({setFieldValue, dirty, isValid}) => {
                    return(
                        (tastings && beverages) && (
                            <Form autoComplete='off'>
                                <RegularInputField input='name' inputLabel='Name' />
                                <Autocomplete
                                    freeSolo
                                    value={initialBeverage}
                                    options={beverages}
                                    getOptionLabel={option => option.name}
                                    onChange={(e, value) => {
                                        setFieldValue(
                                            'beverage',
                                            value !== null && typeof value !== 'string' ? value.id : null
                                        )
                                    }}
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            label={'Beverage'}
                                            variant='outlined'
                                            margin='dense'
                                            fullWidth
                                        />
                                    )}
                                />
                                <Autocomplete
                                    freeSolo
                                    value={initialTasting}
                                    options={tastings}
                                    getOptionLabel={option => option.color}
                                    filterOptions={(options, state) => options}
                                    onChange={(e, value) => {
                                        setFieldValue(
                                            'color',
                                            value !== null && typeof value !== 'string' ? value.color : null
                                        )
                                    }}
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            label={'Color'}
                                            variant='outlined'
                                            margin='dense'
                                            fullWidth
                                        />
                                    )}
                                />
                                <Autocomplete
                                    freeSolo
                                    value={initialTasting}
                                    options={tastings}
                                    getOptionLabel={option => option.appearance}
                                    onChange={(e, value) => {
                                        setFieldValue(
                                            'appearance',
                                            value !== null && typeof value !== 'string' ? value.appearance : null
                                        )
                                    }}
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            label={'Appearance'}
                                            variant='outlined'
                                            margin='dense'
                                            fullWidth
                                        />
                                    )}
                                />
                                <Autocomplete
                                    freeSolo
                                    value={initialTasting}
                                    options={tastings}
                                    getOptionLabel={option => option.aroma}
                                    onChange={(e, value) => {
                                        setFieldValue(
                                            'aroma',
                                            value !== null && typeof value !== 'string' ? value.aroma : null
                                        )
                                    }}
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            label={'Aroma'}
                                            variant='outlined'
                                            margin='dense'
                                            fullWidth
                                        />
                                    )}
                                />
                                <Autocomplete
                                    freeSolo
                                    value={initialTasting}
                                    options={tastings}
                                    getOptionLabel={option => option.finish}
                                    onChange={(e, value) => {
                                        setFieldValue(
                                            'finish',
                                            value !== null && typeof value !== 'string' ? value.finish : null
                                        )
                                    }}
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            label={'Finish'}
                                            variant='outlined'
                                            margin='dense'
                                            fullWidth
                                        />
                                    )}
                                />
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
    tastings: state.tastings.data,
    beverages: state.beverages.data
})

export default connect(mapStateToProps)(FormikTasting)
