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
    root: {
      flexGrow: 1,
      marginBottom: theme.spacing(3)
    },
    title: {
      marginRight: theme.spacing(2)
    }
  })
)


// Main component
export function NavigationBar({ isAuthenticated, logoutUser }: INavProps) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <AppBar position='sticky'>
                <Toolbar>
                    <Typography className={classes.title} variant='h6'>
                        MyTastings
                    </Typography>
                    <Button href='/'>Home</Button>
                    {isAuthenticated
                        ? <UserLinks handleLogout={logoutUser} />
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