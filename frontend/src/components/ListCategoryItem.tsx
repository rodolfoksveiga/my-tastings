// Import components, functions, types, variables, and styles
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined'
import ListIconSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'

import DeleteTasting from './DeleteTasting'
import { ICategory } from './CategoriesList'


// Types and interfaces
interface IListCategoryItemProps {
    category: ICategory
    updateTriggerReload: Function
}


// Component
export default function ListCategoryItem({ category, updateTriggerReload }: IListCategoryItemProps) {
    return (
        <div>
            <ListItem
                button
                component={Link}
                to={'/tastings/' + category.id + '/'}
                divider={true}
            >
                <InsertDriveFileOutlinedIcon />
                <ListItemText
                    primary={category.name}
                    inset={true}
                />
                <ListIconSecondaryAction>
                    <IconButton
                        href={'/categories/' + category.id + '/update/'}
                    >
                        <EditOutlinedIcon />
                    </IconButton>
                    <DeleteTasting
                        id={category.id}
                        updateTriggerReload={updateTriggerReload}
                    />
                </ListIconSecondaryAction>
            </ListItem>
        </div>
    )
}
