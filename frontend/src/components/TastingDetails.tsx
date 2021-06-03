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
import IconButton from '@material-ui/core/IconButton'
import Link from '@material-ui/icons/Link'

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
export function TastingDetails({ isAuthenticated, tastings, message }: ITastingDetailsProps) {
    const classes = useStyles()
    const history = useHistory()
    const { id } = useParams<ITastingParams>()

    let tasting = null
    if (tastings) {
        tasting = tastings.find(item => String(item.id) === id)
    }

    if (!isAuthenticated) {
        history.push('/login/')
    }

    return (
        <div>
            <Typography className={classes.pageTitle} variant='h4' component='h4' align='center'>
                Tasting Detail
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
                    tasting && (
                        <div>
                            <Grid item >
                                <Paper 
                                    className={classes.paper}
                                    variant='outlined'
                                >
                                    <Typography
                                        className={classes.paperHeader}
                                        variant='h4'
                                        component='h4'
                                        align='center'
                                    >
                                        {tasting.name}
                                    </Typography>
                                    <hr />
                                    <Typography className={classes.paperText} component='p'>
                                        Beverage: {tasting.beverageName}
                                        <IconButton
                                            className={classes.linkButton}
                                            href={'/beverages/' + tasting.beverage + '/'}
                                        >
                                            <Link />
                                        </IconButton>
                                    </Typography>
                                    <Typography className={classes.paperText} component='p'>
                                        Modified at: {tasting.modified_at}
                                    </Typography>
                                    <Typography className={classes.paperText} component='p'>
                                        Color: {tasting.color}
                                    </Typography>
                                    <Typography className={classes.paperText} component='p'>
                                        Appearance: {tasting.appearance}
                                    </Typography>
                                    <Typography className={classes.paperText} component='p'>
                                        Aroma: {tasting.aroma}
                                    </Typography>
                                    <Typography className={classes.paperText} component='p'>
                                        Finish: {tasting.finish}
                                    </Typography>
                                    <Typography className={classes.paperText} component='p'>
                                        Rating: {tasting.rating}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid>
                                <Button
                                    className={classes.updateButton}
                                    variant='outlined'
                                    href={'/tastings/' + id + '/update/'}
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
                                    className={classes.cancelButton}
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
