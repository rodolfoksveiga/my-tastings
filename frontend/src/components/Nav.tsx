// Import components, functions, types, variables, and styles
import { connect } from 'react-redux'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import logoutUser from '../actions/logoutUser'
import { TRootState } from '../reducers/rootReducer'
import GuestLinks from './GuestLinks'
import UserLinks from './UserLinks'


// Types and interfaces
interface INavProps {
    isAuthenticated: boolean | null
    logoutUser: Function
}


// Main component
export function Nav({ isAuthenticated, logoutUser }: INavProps) {
    return (
        <AppBar>
            <Toolbar>
                <Typography variant='h6'>
                    MyTastings
                </Typography>
                <Button href='/'>Home</Button>
                {isAuthenticated
                    ? <UserLinks handleLogout={logoutUser} />
                    : <GuestLinks />

                }
            </Toolbar>
            
        </AppBar>
    )
}

const mapStateToProps = (state: TRootState) => ({
    isAuthenticated: state.authUser.isAuthenticated
})

export default connect(mapStateToProps, { logoutUser })(Nav)
