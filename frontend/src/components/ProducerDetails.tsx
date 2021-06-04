// Import components, functions, types, variables, and styles
import { connect } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined'

import { TRootState } from '../reducers/rootReducer'
import { TProducers } from './ProducersList'


// Types and interfaces
export interface IProducerParams {
    id: string
}

interface IProducerDetailsProps {
    isAuthenticated: boolean
    producers: TProducers | null
    message: string | null
}


// Global variables
const useStyles = makeStyles(theme => ({
    parentGrid: {
        padding: theme.spacing(2)
    },
    pageTitle: {
        margin: theme.spacing(2)
    },
    paper: {
        marginTop: theme.spacing(1),
        color: theme.palette.common.black
    },
    paperHeader: {
        margin: theme.spacing(2)
    },
    paperLink: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        fontSize: '1rem'
    },
    paperText: {
        margin: theme.spacing(1),
        fontSize: '1rem'
    },
    updateButton: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(3),
        color: theme.palette.common.black,
        '&:hover': {
            color: theme.palette.warning.main,
            borderColor: theme.palette.warning.main
        }
    },
    cancelButton: {
        marginTop: theme.spacing(2),
        color: theme.palette.common.black,
        '&:hover': {
            color: theme.palette.error.main,
            borderColor: theme.palette.error.main
        }
    },
    linkButton: {
        '&:hover': {
            color: theme.palette.primary.main,
            borderColor: theme.palette.primary.main
        }
    }
}))


// Component
export function ProducerDetails({ isAuthenticated, producers, message }: IProducerDetailsProps) {
    const classes = useStyles()
    const history = useHistory()
    const { id } = useParams<IProducerParams>()

    let producer = null
    if (producers) {
        producer = producers.find(item => String(item.id) === id)
    }

    if (!isAuthenticated) {
        history.push('/login/')
    }

    return (
        <div>
            <Typography className={classes.pageTitle} variant='h4' component='h2' align='center'>
                Producer Detail
            </Typography>
            <Grid
                className={classes.parentGrid}
                container
                direction='column'
                justify='flex-start'
                alignItems='center'
            >
                {message ? (
                    <h3>{message}</h3>
                ) : (
                    producer && (
                        <div>
                            <Grid item >
                                <Paper 
                                    className={classes.paper}
                                    variant='outlined'
                                >
                                    <Typography
                                        className={classes.paperHeader}
                                        variant='h5'
                                        component='h3'
                                        align='center'
                                    >
                                        {producer.name}
                                    </Typography>
                                    <hr />
                                    <Typography className={classes.paperText} component='p'>
                                        <b>Country: </b>{producer.country}
                                    </Typography>
                                    <Typography className={classes.paperText} component='p'>
                                        <b>Region: </b>{producer.region}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid>
                                <Button
                                    className={classes.updateButton}
                                    variant='outlined'
                                    href={'/producers/' + id + '/update/'}
                                    startIcon={<EditOutlinedIcon />}
                                    fullWidth
                                >
                                    Update Producer
                                </Button>
                            </Grid>
                            <Grid
                                item
                            >
                                <Button
                                    className={classes.cancelButton}
                                    variant='outlined'
                                    href='/producers/'
                                    startIcon={<ArrowBackOutlinedIcon />}
                                    fullWidth
                                >
                                    Back to Producers List
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
    producers: state.producers.data
})

export default connect(mapStateToProps)(ProducerDetails)
