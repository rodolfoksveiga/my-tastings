// Import components, functions, types, variables, and styles
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined'

import { TRootState } from '../reducers/rootReducer'
import { TTastings } from './TastingsList'


// Types and interfaces
export interface ITastingParams {
    id: string
}

interface ITastingDetailsProps {
    isAuthenticated: boolean
    tastings: TTastings | null
    message: string | null
}


// Component
export function TastingDetails({ isAuthenticated, tastings, message }: ITastingDetailsProps) {
    const { id } = useParams<ITastingParams>()

    let tasting = null
    if (tastings) {
        tasting = tastings.find(item => String(item.id) === id)
    }

    return (
        <div>
            <Grid
                container
                direction='column'
                justify='flex-start'
                alignItems='center'
            >
                <Grid
                    item
                >
                    <h2>Tasting Details</h2>
                </Grid>
                {message ? (
                    <h3>{message}</h3>
                ) : (
                    tasting && (
                        <div>
                            <Grid
                                item
                            >
                                <h3>Name: {tasting.name}</h3>
                                <h4>Beverage: {tasting.beverageName}</h4>
                                <h4>Modified at: {tasting.modified_at}</h4>
                                <h4>Color: {tasting.color}</h4>
                                <h4>Appearance: {tasting.appearance}</h4>
                                <h4>Arroma: {tasting.aroma}</h4>
                                <h4>Finish: {tasting.finish}</h4>
                                <h4>Rating: {tasting.rating}</h4>
                            </Grid>
                            <Grid>
                                <Button
                                    variant='outlined'
                                    href={'/tastings/' + id + '/update/'}
                                    color='primary'
                                    startIcon={<EditOutlinedIcon />}
                                    fullWidth
                                >
                                    Update Tasting
                                </Button>
                            </Grid>
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
                        </div>
                    )
                )}
            </Grid>
        </div>
    )
}


// Connect to Redux
const mapStateToProps = (state: TRootState) => ({
    isAuthenticated: state.authUser.isAuthenticated,
    tastings: state.tastings.data
})

export default connect(mapStateToProps)(TastingDetails)
