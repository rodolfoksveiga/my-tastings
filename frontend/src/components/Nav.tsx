import {Fragment, MouseEvent, useState} from 'react'
import {Link} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }))

export default function Nav() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const classes = useStyles()
    return (
        <Fragment>
            <AppBar position='static'>
                <Toolbar>
                    <Button aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick}>
                        Menu
                    </Button>
                    <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                        <MenuItem onClick={handleClose}>
                            <Link to='/tastings/'>Tastings</Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>Categories</MenuItem>
                        <MenuItem onClick={handleClose}>Producers</MenuItem>
                    </Menu>
                    <Typography variant='h6' className={classes.title}>MyTastings</Typography>
                    <Button color='inherit'>
                        <Link to='/login/'>Login</Link>
                    </Button>
                </Toolbar>
            </AppBar>
        </Fragment>
    )
}