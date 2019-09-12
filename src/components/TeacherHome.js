import React from 'react'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import AddBoxIcon from '@material-ui/icons/AddBox';
import FolderIcon from '@material-ui/icons/Folder';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import CssBaseline from '@material-ui/core/CssBaseline';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
}));

export default function TeacherHome() {
    const classes = useStyles();
    return <div className={classes.root}>
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.toolbar} />
            <List>
                <ListItem button key='Nueva Encuesta'>
                    <ListItemIcon><AddBoxIcon /></ListItemIcon>
                    <ListItemText primary='Nueva Encuesta' />
                </ListItem>
                <ListItem button key='Mis Encuestas'>
                    <ListItemIcon><FolderIcon /></ListItemIcon>
                    <ListItemText primary='Mis Encuestas' />
                </ListItem>
                <ListItem button key='Resultados'>
                    <ListItemIcon><SignalCellularAltIcon /></ListItemIcon>
                    <ListItemText primary='Resultados' />
                </ListItem>

            </List>
        </Drawer>
        Es el home del teacher
        </div>
}