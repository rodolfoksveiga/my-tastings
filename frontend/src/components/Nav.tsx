// Import components, functions, types, variables, and styles
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

// Main component
export default function Nav() {
    return (
        <AppBar>
            <Toolbar>
                <Typography variant='h6'>
                    MyTastings
                </Typography>
                <Button href='/'>Home</Button>
                <Button href='/tastings/'>Tastings</Button>
                <Button href='/about/'>About</Button>
                <Button href='/login/'>Login</Button>
                <Button href='/logout/'>Logout</Button>
                <Button href='/register/'>Register</Button>
            </Toolbar>
            
        </AppBar>
    )
}
