// Import components, functions, types, variables, and styles
import { useState, MouseEvent, Fragment } from 'react'
import { useHistory } from 'react-router-dom'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'

// Types and interfaces
interface IUserLinksProps {
    logoutUser: Function
}


// Global variables
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        navBarLinks: {
            '&:hover': {
                color: theme.palette.common.white
            }
        }
    })
)


// Component
export default function UserLinks({ logoutUser }: IUserLinksProps) {
    const classes = useStyles()
    const history = useHistory()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    function handleLogout() {
        logoutUser()
        history.push('/login/')
    }

    return(
        <Fragment>
            <Button className={classes.navBarLinks} href='/tastings/'>
                Tastings
            </Button>
            <Button className={classes.navBarLinks} href='/beverages/'>
                Beverages
            </Button>
            <Button className={classes.navBarLinks} href='/producers/'>
                Producers
            </Button>
            <Button className={classes.navBarLinks} href='/categories/'>
                Categories
            </Button>
            <IconButton onClick={handleClick} color='secondary'>
                <AccountCircleOutlinedIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                >
                <MenuItem href='/login/' onClick={handleLogout}>Logout</MenuItem>
                <MenuItem href='/'>Profile</MenuItem>
                <MenuItem href='/'>My account</MenuItem>
                <MenuItem href='/'>Settings</MenuItem>
            </Menu>
        </Fragment>
    )
}