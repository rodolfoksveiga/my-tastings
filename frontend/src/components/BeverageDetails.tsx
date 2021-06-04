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
import { TBeverages } from './BeveragesList'


// Types and interfaces
export interface IBeverageParams {
    id: string
}

interface IBeverageDetailsProps {
    isAuthenticated: boolean
    beverages: TBeverages | null
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
export function BeverageDetails({ isAuthenticated, beverages, message }: IBeverageDetailsProps) {
    const classes = useStyles()
    const history = useHistory()
    const { id } = useParams<IBeverageParams>()

    let beverage = null
    if (beverages) {
        beverage = beverages.find(item => String(item.id) === id)
    }

    if (!isAuthenticated) {
        history.push('/login/')
    }

    return (
        <div>
            <Typography className={classes.pageTitle} variant='h4' component='h2' align='center'>
                Beverage Detail
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
                    beverage && (
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
                                        {beverage.name}
                                    </Typography>
                                    <hr />
                                    <Typography className={classes.paperLink} component='p'>
                                        <b>Producer: </b>{beverage.producerName}
                                        <IconButton
                                            className={classes.linkButton}
                                            href={'/producers/' + beverage.producer + '/'}
                                        >
                                            <Link />
                                        </IconButton>
                                    </Typography>
                                    <Typography className={classes.paperText} component='p'>
                                        <b>Category: </b>{beverage.categoryName}
                                    </Typography>
                                    <Typography className={classes.paperText} component='p'>
                                        <b>Modified at: </b>{beverage.modified_at}
                                    </Typography>
                                    <Typography className={classes.paperText} component='p'>
                                        <b>Classification: </b>{beverage.classification}
                                    </Typography>
                                    <Typography className={classes.paperText} component='p'>
                                        <b>Base: </b>{beverage.base}
                                    </Typography>
                                    <Typography className={classes.paperText} component='p'>
                                        <b>Year of production: </b>{beverage.year}
                                    </Typography>
                                    <Typography className={classes.paperText} component='p'>
                                        <b>Volume: </b>{beverage.volume}
                                    </Typography>
                                    <Typography className={classes.paperText} component='p'>
                                        <b>Percentage of alcohol: </b>{beverage.degree} %
                                    </Typography>
                                    <Typography className={classes.paperText} component='p'>
                                        <b>Price: </b>$ {beverage.price}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid>
                                <Button
                                    className={classes.updateButton}
                                    variant='outlined'
                                    href={'/beverages/' + id + '/update/'}
                                    startIcon={<EditOutlinedIcon />}
                                    fullWidth
                                >
                                    Update Beverage
                                </Button>
                            </Grid>
                            <Grid
                                item
                            >
                                <Button
                                    className={classes.cancelButton}
                                    variant='outlined'
                                    href='/beverages/'
                                    startIcon={<ArrowBackOutlinedIcon />}
                                    fullWidth
                                >
                                    Back to Beverages List
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
    beverages: state.beverages.data
})

export default connect(mapStateToProps)(BeverageDetails)
