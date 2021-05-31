// Import components, functions, types, variables, and styles
import { Link } from 'react-router-dom'
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


// Component
export default function ListTastingItem({ tasting, updateTriggerReload }: IListTastingItemProps) {
    return (
        <div>
            <ListItem
                button
                component={Link}
                to={'/tastings/' + tasting.id + '/'}
                divider={true}
            >
                <InsertDriveFileOutlinedIcon />
                <ListItemText
                    primary={tasting.name}
                    inset={true}
                />
                <ListIconSecondaryAction>
                    <IconButton
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