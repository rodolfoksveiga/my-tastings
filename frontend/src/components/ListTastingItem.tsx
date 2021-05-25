// Import components, functions, types, variables, and styles
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined'
import ListIconSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'

import { ITasting } from './Tastings'
import DeleteTasting from './DeleteTasting'

// Types and interfaces
interface IListTastingItemProps {
    tasting: ITasting
    updateTriggerReload: Function
}

// Component
export default function ListTastingItem({ tasting, updateTriggerReload }: IListTastingItemProps) {
    return (
        <div>
            <ListItem
                key={tasting.id}
                button
                component={Link}
                to={'/tastings/' + tasting.id + '/'}
            >
                <InsertDriveFileOutlinedIcon />
                <ListItemText
                    primary={tasting.beverage}
                    secondary={tasting.modified_at}
                />
                <ListIconSecondaryAction>
                    <IconButton
                        href={'/tastings/' + tasting.id + '/update/'}
                    >
                        <EditOutlinedIcon />
                    </IconButton>
                    <DeleteTasting
                        tasting={tasting}
                        updateTriggerReload={updateTriggerReload}
                    />
                </ListIconSecondaryAction>
            </ListItem>
        </div>
    )
}