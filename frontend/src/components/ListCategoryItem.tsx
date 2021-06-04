// Import components, functions, types, variables, and styles
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
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


// Global variables
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        listItem: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(8)
        },
        detailIcon: {
            '&:hover': {
                color: theme.palette.warning.main
            }
        }
    })
)


// Component
export default function ListCategoryItem({ category, updateTriggerReload }: IListCategoryItemProps) {
    const classes = useStyles()

    return (
        <div>
            <ListItem
                className={classes.listItem}
                divider={true}
            >
                <InsertDriveFileOutlinedIcon />
                <ListItemText primary={category.name} />
                <ListIconSecondaryAction>
                    <IconButton
                        className={classes.detailIcon}
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
