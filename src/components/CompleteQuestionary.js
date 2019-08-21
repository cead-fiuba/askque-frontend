import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import SendIcon from '@material-ui/icons/Send'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';


const messages = [
    {
        id: 1,
        primary: 'Dado que dsadasdknsam daskdnaskdsandkasnd kasndsamdnasjdnasdunx asndksadnasdnas',
        secondary: ['Sí', 'No']
    },
    {
        id: 2,
        primary: 'Birthday Gift',
        secondary: ['SI', 'NO', 'El cuerpo gira pero no rosa con eso, dado que tiene 3 cabezas']

    },
    {
        id: 3,
        primary: 'Dado que Newton nunca se expresó sobre el gravitismo epileptico, no es posible definir que pensaba',
        secondary: ['Cris no pago el seguro porque se la pasó jugando Free Fire', 'Mañana a la tarde van a caer granizo y Cris no arreglo el tema de su seguro', 'Mañana a la mañana va llover muchos chanchos']
    },
    {
        id: 4,
        primary: 'Yes!',
        secondary: ['SI', 'NO']
    },
    {
        id: 5,
        primary: "Doctor's Appointment",
        secondary: ['SI', 'NO']
    },
    {
        id: 6,
        primary: 'Discussion',
        secondary: ['SI', 'NO']

    },
    {
        id: 7,
        primary: 'Summer BBQ',
        secondary: ['SI', 'NO']

    },
    {
        id: 8,
        primary: 'Summer BBQ',
        secondary: ['SI', 'NO']
    }
];



const useStyles = makeStyles(theme => ({
    text: {
        padding: theme.spacing(2, 2, 0),
    },
    paper: {
        paddingBottom: 50,
    },
    list: {
        marginBottom: theme.spacing(2),
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    grow: {
        flexGrow: 1,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
}));

export default function BottomAppBar() {
    const classes = useStyles();

    const [checked, setChecked] = React.useState([0]);


    const createOptions = (options) => {
        return options.map((option, idx) => (
            <ListItem key={idx} role={undefined} dense button>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={checked.indexOf(idx) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': idx }}
                    />
                </ListItemIcon>
                <ListItemText id={idx} primary={option} />
            </ListItem>
        ))
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Paper square className={classes.paper}>
                <List className={classes.list}>
                    {messages.map(({ id, primary, secondary }) => (
                        <React.Fragment key={id}>
                            {id === 1 && <ListSubheader className={classes.subheader}>Today</ListSubheader>}
                            {id === 3 && <ListSubheader className={classes.subheader}><b>Yesterday</b></ListSubheader>}
                            <ListItem button>
                                <ListItemText primary={primary} secondary={createOptions(secondary)} />
                            </ListItem>
                        </React.Fragment>
                    ))}
                </List>
            </Paper>
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar>
                    <Fab color="secondary" aria-label="add" className={classes.fabButton}>
                        <SendIcon />
                    </Fab>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}
