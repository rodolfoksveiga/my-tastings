// Import components, functions, types, variables, and styles
import { connect } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined'

import FormikCategory from './FormikCategory'
import updateCategory from '../actions/updateCategory'
import { TCategories } from './CategoriesList'
import { TRootState } from '../reducers/rootReducer'
import { ICategoryForm } from './CreateCategory'

// Types and interfaces
interface ICategoryParams {
    id: string
}

interface IUpdateCategoryProps {
    isAuthenticated: boolean
    accessToken: string | null
    categories: TCategories | null
    message: string | null
    updateCategory: Function
}

// Global variables
const useStyles = makeStyles((theme) => ({
    parentGrid: {
        padding: theme.spacing(2),
    },
    pageTitle: {
        margin: theme.spacing(2),
    },
    cancelButton: {
        marginTop: theme.spacing(3),
        color: theme.palette.common.black,
        '&:hover': {
            color: theme.palette.error.main,
            borderColor: theme.palette.error.main,
        },
    },
}))

// Main component
export function UpdateCategory({
    isAuthenticated,
    accessToken,
    categories,
    updateCategory,
}: IUpdateCategoryProps) {
    const classes = useStyles()
    const { id } = useParams<ICategoryParams>()
    const history = useHistory()

    let category = null
    if (categories) {
        category = categories.find((item) => String(item.id) === id)
    }

    function handleUpdate(form: ICategoryForm) {
        updateCategory(accessToken, id, form)
        history.push('/categories/')
    }

    if (!isAuthenticated) {
        history.push('/login/')
    }

    return (
        <div>
            <Typography
                className={classes.pageTitle}
                variant="h4"
                component="h4"
                align="center"
            >
                Update Category
            </Typography>
            <Grid
                container
                className={classes.parentGrid}
                direction="column"
                justify="flex-start"
                alignItems="center"
            >
                {category && (
                    <FormikCategory
                        initialFormData={category}
                        handleSubmit={handleUpdate}
                    />
                )}
                <Grid item>
                    <Button
                        className={classes.cancelButton}
                        variant="outlined"
                        href="/categories/"
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
    categories: state.categories.data,
})

export default connect(mapStateToProps, { updateCategory })(UpdateCategory)
