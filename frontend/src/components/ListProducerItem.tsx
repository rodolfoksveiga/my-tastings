// Import components, functions, types, variables, and styles
import { Link } from 'react-router-dom'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined'
import ListIconSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'

import DeleteProducer from './DeleteProducer'
import { IProducer } from './ProducersList'

// Types and interfaces
interface IListProducerItemProps {
    producer: IProducer
    updateTriggerReload: Function
}

// Global variables
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        listItem: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(8),
            '&:hover': {
                color: theme.palette.primary.main,
            },
        },
        detailIcon: {
            '&:hover': {
                color: theme.palette.warning.main,
            },
        },
    })
)

// Component
export default function ListProducerItem({
    producer,
    updateTriggerReload,
}: IListProducerItemProps) {
    const classes = useStyles()

    return (
        <div>
            <ListItem
                className={classes.listItem}
                button
                component={Link}
                to={'/producers/' + producer.id + '/'}
                divider={true}
            >
                <InsertDriveFileOutlinedIcon />
                <ListItemText primary={producer.name} />
                <ListIconSecondaryAction>
                    <IconButton
                        className={classes.detailIcon}
                        href={'/producers/' + producer.id + '/update/'}
                    >
                        <EditOutlinedIcon />
                    </IconButton>
                    <DeleteProducer
                        id={producer.id}
                        updateTriggerReload={updateTriggerReload}
                    />
                </ListIconSecondaryAction>
            </ListItem>
        </div>
    )
}
