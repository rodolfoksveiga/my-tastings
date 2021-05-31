// Import components, functions, types, variables, and styles
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined'
import ListIconSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'

import DeleteTasting from './DeleteTasting'
import { IBeverage } from './BeveragesList'


// Types and interfaces
interface IListBeverageItemProps {
    beverage: IBeverage
    updateTriggerReload: Function
}


// Component
export default function ListBeverageItem({ beverage, updateTriggerReload }: IListBeverageItemProps) {
    return (
        <div>
            <ListItem
                key={beverage.id}
                button
                component={Link}
                to={'/tastings/' + beverage.id + '/'}
            >
                <InsertDriveFileOutlinedIcon />
                <ListItemText
                    primary={beverage.name}
                    secondary={beverage.modified_at}
                />
                <ListIconSecondaryAction>
                    <IconButton
                        href={'/tastings/' + beverage.id + '/update/'}
                    >
                        <EditOutlinedIcon />
                    </IconButton>
                    <DeleteTasting
                        id={beverage.id}
                        updateTriggerReload={updateTriggerReload}
                    />
                </ListIconSecondaryAction>
            </ListItem>
        </div>
    )
}