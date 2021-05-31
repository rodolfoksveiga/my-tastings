// Import components, functions, types, variables, and styles
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar'

import logoutUser from '../actions/logoutUser'
import GuestLinks from './GuestLinks'
import UserLinks from './UserLinks'
import { TRootState } from '../reducers/rootReducer'
import { IUser } from '../actions/loadUser'


// Types and interfaces
interface INavProps {
    isAuthenticated: boolean
    user: IUser | null
    logoutUser: Function
}


// Main component
export function NavigationBar({ isAuthenticated, user, logoutUser }: INavProps) {
    const history = useHistory()

    function handleLogout() {
        logoutUser()
        history.push('/')
    }

    return (
        <Navbar
        bg='dark'
        variant='dark'
        sticky='top'
        expand='lg'
        collapseOnSelect
        >
            <Navbar.Brand href='/'>MyTastings</Navbar.Brand>
            <Navbar.Toggle />
            {isAuthenticated && user ? (
                <UserLinks user={user} handleLogout={handleLogout} />
            ) : (
                <GuestLinks />
            )}
      </Navbar>
    )
}

const mapStateToProps = (state: TRootState) => ({
    isAuthenticated: state.authUser.isAuthenticated,
    user: state.authUser.user
})

export default connect(mapStateToProps, { logoutUser })(NavigationBar)