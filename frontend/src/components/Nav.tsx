import { Link } from 'react-router-dom'

export default function Nav() {
    return (
        <nav>
            Logo
            <Link to='/'>Home</Link>
            <Link to='/tastings/'>Tastings</Link>
            <Link to='/about/'>About</Link>
            <Link to='/login/'>Login</Link>
            User
        </nav>
    )
}