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
import { IProducerForm } from './CreateProducer'
import { TRootState } from '../reducers/rootReducer'
import { IProducer, TProducers } from './ProducersList'


// Types and interfaces
interface IProducerFormikProps {
    initialFormData: IProducerForm
    producers: TProducers | null
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
export function FormikProducer({
    initialFormData,
    producers,
    handleSubmit
}: IProducerFormikProps) {
    const classes = useStyles()

    // FIX HERE!
    const names = producers ?
        '^((?!' + producers.map(producer => producer.name).join('|') + ')).*$' :
        '.'
    const regex = new RegExp(names)
    const FormSchema = Yup.object().shape({
        name: Yup.string()
            .trim()
            .matches(regex, 'Producer already exist. Try another name.')
            .required('You must define a producer name.')
    })

    let initialProducer: IProducer | undefined = undefined
    if (producers) {
        initialProducer = producers.find(item => item.id === initialFormData.id)
    }

    return (
        <div>
            <Formik
                initialValues={initialFormData}
                onSubmit={form => {
                    form.name = form.name.trim()
                    form.country = form.country.trim()
                    form.region = form.region.trim()
                    handleSubmit(form)
                }}
                validationSchema={FormSchema}
            >
                {({setFieldValue, dirty, isValid}) => {
                    return(
                        (producers) && (
                            <Form autoComplete='off'>
                                <RegularInputField input='name' inputLabel='Name' />
                                <Autocomplete
                                    freeSolo
                                    value={initialProducer}
                                    options={producers}
                                    getOptionLabel={option => option.country}
                                    onChange={(e, value) => {
                                        setFieldValue(
                                            'country',
                                            value !== null && typeof value !== 'string' ? value.country : null
                                        )
                                    }}
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            label={'Country'}
                                            variant='outlined'
                                            margin='dense'
                                            fullWidth
                                            />
                                    )}
                                />
                                <Autocomplete
                                    freeSolo
                                    value={initialProducer}
                                    options={producers}
                                    getOptionLabel={option => option.region}
                                    onChange={(e, value) => {
                                        setFieldValue(
                                            'region',
                                            value !== null && typeof value !== 'string' ? value.region : null
                                        )
                                    }}
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            label={'Region'}
                                            variant='outlined'
                                            margin='dense'
                                            fullWidth
                                            />
                                    )}
                                />
                                <Grid item>
                                    <ButtonGroup className={classes.submitButtons} fullWidth>
                                        <Button
                                            className={classes.saveButton}
                                            type='submit'
                                            variant='outlined'
                                            disabled={!isValid}
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
    producers: state.producers.data
})

export default connect(mapStateToProps)(FormikProducer)
