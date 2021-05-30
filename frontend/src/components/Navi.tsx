// Import components, functions, types, variables, and styles
import { connect } from 'react-redux'

// import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

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
    username: string
    logoutUser: Function
}


// Main component
export function Navi({ isAuthenticated, username, logoutUser }: INavProps) {
    return (
        <AppBar>
        <Toolbar>
            <Typography variant='h6'>
                MyTastings
            </Typography>
            <Button href='/'>Home</Button>
            {isAuthenticated
                ? <UserLinks handleLogout={logoutUser} username={username} />
                : <GuestLinks />
            }
        </Toolbar>
    </AppBar>
    )
}

const mapStateToProps = (state: TRootState) => ({
    isAuthenticated: state.authUser.isAuthenticated,
    username: state.authUser.user?.username
})

export default connect(mapStateToProps, { logoutUser })(Nav)


/*
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand href="#home">My Tastings</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Nav>
            {username}
            <UserLinks handleLogout={logoutUser} />
        </Nav>
    </Navbar.Collapse>
</Navbar>
*/