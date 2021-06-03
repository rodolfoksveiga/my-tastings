// Import components, functions, types, variables, and styles
import { Link } from 'react-router-dom'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined'
import ListIconSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'

import DeleteTasting from './DeleteTasting'
import { ITasting } from './TastingsList'


// Types and interfaces
interface IListTastingItemProps {
    tasting: ITasting
    updateTriggerReload: Function
}


// Global variables
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        listItem: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(8),
            '&:hover': {
                color: theme.palette.primary.main
            }
        },
        detailIcon: {
            '&:hover': {
                color: theme.palette.warning.main
            }
        }
    })
)


// Component
export default function ListTastingItem({ tasting, updateTriggerReload }: IListTastingItemProps) {
    const classes = useStyles()

    return (
        <div>
            <ListItem
                className={classes.listItem}
                button
                component={Link}
                to={'/tastings/' + tasting.id + '/'}
                divider={true}
            >
                <InsertDriveFileOutlinedIcon />
                <ListItemText primary={tasting.name} />
                <ListIconSecondaryAction>
                    <IconButton
                        className={classes.detailIcon}
                        href={'/tastings/' + tasting.id + '/update/'}
                    >
                        <EditOutlinedIcon />
                    </IconButton>
                    <DeleteTasting
                        id={tasting.id}
                        updateTriggerReload={updateTriggerReload}
                    />
                </ListIconSecondaryAction>
            </ListItem>
        </div>
    )
}
