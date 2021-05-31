// Import components, functions, types, variables, and styles
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

import { IUser } from '../actions/loadUser'


// Types and interfaces
interface IUserLinksProps {
    user: IUser
    handleLogout: Function
}


// Component
export default function UserLinks({ user, handleLogout }: IUserLinksProps) {
    return(
        <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav>
                <Nav.Link href='/tastings/'>Tastings</Nav.Link>
                <Nav.Link href='/beverages/'>Beverages</Nav.Link>
                <Nav.Link href='/tastings/'>Categories</Nav.Link>
                <Nav.Link href='/tastings/'>Producers</Nav.Link>
                <NavDropdown
                    id='nav-dropdown'
                    title={'Hello, ' + user.username}
                >
                    <NavDropdown.Item href='/tastings/'>Account</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href='/tastings/'>Settings</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar.Collapse>
    )
}