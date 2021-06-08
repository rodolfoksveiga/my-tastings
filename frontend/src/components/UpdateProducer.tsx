// Import components, functions, types, variables, and styles
import { connect } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined'

import FormikProducer from './FormikProducer'
import updateProducer from '../actions/updateProducer'
import { TProducers } from './ProducersList'
import { TRootState } from '../reducers/rootReducer'
import { IProducerParams } from './ProducerDetails'
import { IProducerForm } from './CreateProducer'

// Types and interfaces
interface IUpdateProducerProps {
    isAuthenticated: boolean
    accessToken: string | null
    producers: TProducers | null
    message: string | null
    updateProducer: Function
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
export function UpdateProducer({
    isAuthenticated,
    accessToken,
    producers,
    updateProducer,
}: IUpdateProducerProps) {
    const classes = useStyles()
    const { id } = useParams<IProducerParams>()
    const history = useHistory()

    let producer = null
    if (producers) {
        producer = producers.find((item) => String(item.id) === id)
    }

    function handleUpdate(form: IProducerForm) {
        updateProducer(accessToken, id, form)
        history.push('/producers/' + id + '/')
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
                Update Producer
            </Typography>
            <Grid
                container
                className={classes.parentGrid}
                direction="column"
                justify="flex-start"
                alignItems="center"
            >
                {producer && (
                    <FormikProducer
                        initialFormData={producer}
                        handleSubmit={handleUpdate}
                    />
                )}
                <Grid item>
                    <Button
                        className={classes.cancelButton}
                        variant="outlined"
                        href="/producers/"
                        startIcon={<ArrowBackOutlinedIcon />}
                        fullWidth
                    >
                        Back to Producers List
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
    producers: state.producers.data,
})

export default connect(mapStateToProps, { updateProducer })(UpdateProducer)
