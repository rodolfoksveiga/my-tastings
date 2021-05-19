// Import components, functions, types, variables, and styles
import { Link } from 'react-router-dom'

// Main component
export default function Nav() {
    return (
        <nav>
            Logo
            <Link to='/'>Home</Link>
            <Link to='/tastings/'>Tastings</Link>
            <Link to='/about/'>About</Link>
            <Link to='/login/'>Login</Link>
            <Link to='/logout/'>Logout</Link>
            <Link to='/register/'>Register</Link>
            User
        </nav>
    )
}
