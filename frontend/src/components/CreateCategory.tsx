// Import components, functions, types, variables, and styles
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined'

import FormikCategory from './FormikCategory'
import createCategory from '../actions/createCategory'
import { TRootState } from '../reducers/rootReducer'


// Types and interfaces
export interface ICategoryForm {
    id?: number
    modified_at?: string
    name: string
    user: number | null
}

interface ICreateCategoryProps {
    isAuthenticated: boolean
    accessToken: string | null
    userId: number | null
    createCategory: Function
}


// Global variables
const useStyles = makeStyles(theme => ({
    parentGrid: {
        padding: theme.spacing(2),
    },
    pageTitle: {
        margin: theme.spacing(2)
    },
    cancelButton: {
        marginTop: theme.spacing(3),
        color: theme.palette.common.black,
        '&:hover': {
            color: theme.palette.error.main,
            borderColor: theme.palette.error.main
        }
    }
}))


// Main component
export function CreateCategory({ isAuthenticated, accessToken, userId, createCategory }: ICreateCategoryProps) {
    const classes = useStyles()
    const history = useHistory()

    const initialCategoryForm: ICategoryForm = {
        name: '',
        user: userId
    }

    function handleCreate(formData: ICategoryForm) {
        createCategory(accessToken, formData)
        history.push('/categories/')
    }

    if (!isAuthenticated) {
        history.push('/login/')
    }

    return (
        <div>
            <Typography className={classes.pageTitle} variant='h4' component='h4' align='center'>
                Create Category
            </Typography>
            <Grid
                container
                className={classes.parentGrid}
                direction='column'
                justify='flex-start'
                alignItems='center'
            >
                <Grid item>
                    <FormikCategory
                        initialFormData={initialCategoryForm}
                        handleSubmit={handleCreate} 
                    />
                </Grid>
                <Grid item>
                    <Button
                        className={classes.cancelButton}
                        variant='outlined'
                        href='/categories/'
                        startIcon={<ArrowBackOutlinedIcon />}
                        fullWidth
                    >
                        Back to Categories List
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}


// Connect to Redux
const mapStateToProps = (state: TRootState) => ({
    isAuthenticated: state.authUser.isAuthenticated,
    accessToken: state.authUser.accessToken,
    userId: state.authUser.userId
})

export default connect(mapStateToProps, { createCategory })(CreateCategory)
