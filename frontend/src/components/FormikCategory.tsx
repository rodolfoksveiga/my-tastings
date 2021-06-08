// Import components, functions, types, variables, and styles
import { connect } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined'
import ClearAllOutlinedIcon from '@material-ui/icons/ClearAllOutlined'
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined'

import RegularInputField from './RegularInputField'
import { ICategoryForm } from './CreateCategory'
import { TRootState } from '../reducers/rootReducer'
import { TCategories } from './CategoriesList'


// Types and interfaces
interface ICategoryFormikProps {
    initialFormData: ICategoryForm
    categories: TCategories | null
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
export function FormikCategory({initialFormData, categories, handleSubmit}: ICategoryFormikProps) {
    const classes = useStyles()
    
    // FIX HERE!
    const names = categories ?
        '^((?!' + categories.map(categorie => categorie.name).join('|') + ')).*$' :
        '.'
    const regex = new RegExp(names)
    const FormSchema = Yup.object().shape({
        name: Yup.string()
            .trim()
            .matches(regex, 'Category already exist. Try another name.')
            .required('You must define a category name.')
    })

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
                {({dirty, isValid}) => {
                    return(
                        <Form autoComplete='off'>
                            <RegularInputField input='name' inputLabel='Name' />
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
                }}
            </Formik>
        </div>
    )
}



// Connect to Redux
const mapStateToProps = (state: TRootState) => ({
    categories: state.categories.data
})

export default connect(mapStateToProps)(FormikCategory)
