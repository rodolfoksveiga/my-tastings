// Import components, functions, types, variables, and styles
import { connect } from 'react-redux'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import logoutUser from '../actions/logoutUser'
import GuestLinks from './GuestLinks'
import UserLinks from './UserLinks'
import { TRootState } from '../reducers/rootReducer'


// Types and interfaces
interface INavProps {
    isAuthenticated: boolean
    logoutUser: Function
}


// Global variables
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            flexGrows: true,
            marginBottom: theme.spacing(3)
        },
        title: {
            marginRight: theme.spacing(2)
        },
        navBarLink: {
            '&:hover': {
                color: theme.palette.common.white
            }
        }
    })
)


// Main component
export function NavigationBar({ isAuthenticated, logoutUser }: INavProps) {
    const classes = useStyles()
    
    return (
        <div>
            <AppBar className={classes.appBar} position='sticky'>
                <Toolbar>
                    <Typography className={classes.title} variant='h6'>
                        MyTastings
                    </Typography>
                    <Button className={classes.navBarLink} href='/'>Home</Button>
                    {isAuthenticated
                        ? <UserLinks logoutUser={logoutUser} />
                        : <GuestLinks />
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}

const mapStateToProps = (state: TRootState) => ({
    isAuthenticated: state.authUser.isAuthenticated
})

export default connect(mapStateToProps, { logoutUser })(NavigationBar)