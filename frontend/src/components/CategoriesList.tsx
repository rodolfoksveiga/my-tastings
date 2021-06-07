import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import List from '@material-ui/core/List'

import ListCategoryItem from './ListCategoryItem'
import fetchCategoriesList from '../actions/fetchCategoriesList'
import { TRootState } from '../reducers/rootReducer'


// Types and interfaces
export interface ICategory {
    id: number
    modified_at: string
    name: string
    user: number
}

export type TCategories = ICategory[]

interface ICategoriesListProps {
    isAuthenticated: boolean
    accessToken: string | null
    categories: TCategories | null
    message: string | null
    fetchCategoriesList: Function
}


// Global variables
const useStyles = makeStyles(theme => ({
    parentGrid: {
        padding: theme.spacing(2)
    },
    pageTitle: {
        margin: theme.spacing(2)
    },
    createButton: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
        color: theme.palette.common.black,
        '&:hover': {
            color: theme.palette.primary.main,
            borderColor: theme.palette.primary.main
        }
    }
}))


// Component
export function CategoriesList({ isAuthenticated, accessToken, categories, message, fetchCategoriesList }: ICategoriesListProps) {
    const classes = useStyles()
    const history = useHistory()
    const [triggerReload, setTriggerReload] = useState<boolean>(false)

    useEffect(() => {
        fetchCategoriesList(accessToken)
    }, [accessToken, fetchCategoriesList, triggerReload])

    function updateTriggerReload() {
        setTriggerReload(!triggerReload)
    }

    if (!isAuthenticated) {
        history.push('/login/')
    }

    return (
        <div>
            <Typography className={classes.pageTitle} variant='h4' component='h2' align='center'>
                Categories List
            </Typography>
            <Grid className={classes.parentGrid}>
                <Grid item>
                    <Button
                        className={classes.createButton}
                        variant='outlined'
                        href='/categories/create/'
                        startIcon={<AddOutlinedIcon />}
                        fullWidth
                    >
                        Create new Category
                    </Button>
                </Grid>
                {message ? (
                    <Grid item>
                        <h3>{message}</h3>
                    </Grid>
                ) : (
                    <Grid item>
                        <List>
                            {categories && (
                                categories.map(category => {
                                    return (
                                        <ListCategoryItem
                                            key={category.id}
                                            category={category}
                                            updateTriggerReload={updateTriggerReload}
                                        />
                                    )
                                })
                            )}
                        </List>
                    </Grid>
                )}
                
            </Grid>
        </div>
    )
}


// Connect to Redux
const mapStateToProps = (state: TRootState) => ({
    isAuthenticated: state.authUser.isAuthenticated,
    accessToken: state.authUser.accessToken,
    categories: state.categories.data,
    message: state.categories.message
})

export default connect(mapStateToProps, { fetchCategoriesList })(CategoriesList)
