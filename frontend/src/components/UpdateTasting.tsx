// Import components, functions, types, variables, and styles
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined'

import FormikTasting from './FormikTasting'
import updateTasting from '../actions/updateTasting'
import { TTastings } from './TastingsList'
import { TRootState } from '../reducers/rootReducer'
import { ITastingParams } from './TastingDetails'
import { ITastingForm } from './CreateTasting'
import fetchTastingsList from '../actions/fetchTastingsList'


// Types and interfaces
interface IUpdateTastingProps {
    isAuthenticated: boolean
    tastings: TTastings | null
    message: string | null
    fetchTastingsList: Function
    updateTasting: Function
}


// Main component
export function UpdateTasting({ isAuthenticated, tastings, fetchTastingsList, updateTasting }: IUpdateTastingProps) {
    const { id } = useParams<ITastingParams>()
    const history = useHistory()

    useEffect(() => {
        fetchTastingsList()
    }, [fetchTastingsList])

    let tasting = null
    if (tastings) {
        tasting = tastings.find(item => String(item.id) === id)
    }

    function handleUpdate(form: ITastingForm) {
        updateTasting(id, form)
        history.push('/tastings/' + id + '/')
    }

    return (
        <div>
            <Grid
                container
                direction='column'
                justify='flex-start'
                spacing={3}
                alignItems='center'
            >
                <Grid
                    item
                >
                    <h2>Update Tasting</h2>
                </Grid>
                {tasting && (
                    <FormikTasting
                        initialFormData={tasting}
                        handleSubmit={handleUpdate} 
                    />
                )}
                <Grid
                    item
                >
                    <Button
                        variant='outlined'
                        href='/tastings/'
                        startIcon={<ArrowBackOutlinedIcon />}
                        fullWidth
                    >
                        Back to Tastings List
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}


// Connect to Redux
const mapStateToProps = (state: TRootState) => ({
    isAuthenticated: state.authUser.isAuthenticated,
    tastings: state.tastings.data
})

export default connect(mapStateToProps, { fetchTastingsList, updateTasting })(UpdateTasting)
