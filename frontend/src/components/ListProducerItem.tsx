// Import components, functions, types, variables, and styles
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined'
import ListIconSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'

import DeleteTasting from './DeleteTasting'
import { IProducer } from './ProducersList'


// Types and interfaces
interface IListProducerItemProps {
    producer: IProducer
    updateTriggerReload: Function
}


// Component
export default function ListProducerItem({ producer, updateTriggerReload }: IListProducerItemProps) {
    return (
        <div>
            <ListItem
                button
                component={Link}
                to={'/tastings/' + producer.id + '/'}
                divider={true}
            >
                <InsertDriveFileOutlinedIcon />
                <ListItemText
                    primary={producer.name}
                    inset={true}
                />
                <ListIconSecondaryAction>
                    <IconButton
                        href={'/producers/' + producer.id + '/update/'}
                    >
                        <EditOutlinedIcon />
                    </IconButton>
                    <DeleteTasting
                        id={producer.id}
                        updateTriggerReload={updateTriggerReload}
                    />
                </ListIconSecondaryAction>
            </ListItem>
        </div>
    )
}
