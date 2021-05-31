// Import components, functions, types, variables, and styles
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


// Component
export default function GuestLinks() {
    return(
        <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto'>
                <Nav.Link href='/login/'>Login</Nav.Link>
                <Nav.Link href='/register/'>Register</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    )
}