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
import SendIcon from '@material-ui/icons/Send';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';


const messages = [
    {
        id: 1,
        questionText: 'Dado que dsadasdknsam daskdnaskdsandkasnd kasndsamdnasjdnasdunx asndksadnasdnas',
        options: ['Sí', 'No']
    },
    {
        id: 2,
        questionText: 'Birthday Gift',
        options: ['SI', 'NO', 'El cuerpo gira pero no rosa con eso, dado que tiene 3 cabezas']

    },
    {
        id: 3,
        questionText: 'Dado que Newton nunca se expresó sobre el gravitismo epileptico, no es posible definir que pensaba',
        options: ['Cris no pago el seguro porque se la pasó jugando Free Fire', 'Mañana a la tarde van a caer granizo y Cris no arreglo el tema de su seguro', 'Mañana a la mañana va llover muchos chanchos']
    },
    {
        id: 4,
        questionText: 'Yes!',
        options: ['SI', 'NO']
    },
    {
        id: 5,
        questionText: "Doctor's Appointment",
        options: ['SI', 'NO']
    },
    {
        id: 6,
        questionText: 'Discussion',
        options: ['SI', 'NO']

    },
    {
        id: 7,
        questionText: 'Summer BBQ',
        options: ['SI', 'NO']

    },
    {
        id: 8,
        questionText: 'Summer BBQ',
        options: ['SI', 'NO']
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
    root: {
        padding: theme.spacing(3)
    }
}));

export default function BottomAppBar() {
    const classes = useStyles();

    const [checked, setChecked] = React.useState([]);



    const handleToggle = value => () => {
        console.log('handleToggle', value)
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const createOptions = (options) => {
        return options.map((option, idx) => (
            <ListItem key={idx} role={undefined} dense button onClick={handleToggle(option)}>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={checked.indexOf(option) !== -1}
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
                {/* <List className={classes.list}>
                    {messages.map(({ id, questionText, options }) => (
                        <React.Fragment key={id}>
                            {id === 1 && <ListSubheader className={classes.subheader}>Today</ListSubheader>}
                            {id === 3 && <ListSubheader className={classes.subheader}><b>Yesterday</b></ListSubheader>}
                            <ListItem button>
                                <ListItemText primary={questionText} options={createOptions(options)} />
                            </ListItem>
                        </React.Fragment>
                    ))}
                </List> */}
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="flex-start"
                    className={classes.root}
                >

                    {messages.map(({ id, questionText, options }) => (
                        <Grid
                            item
                            key={id}
                        >

                            <Typography variant="body2" gutterBottom>
                                <b> {questionText} </b>
                            </Typography>
                            <List className={classes.list}>
                                {createOptions(options)}
                            </List>
                        </Grid>
                    ))}

                </Grid>
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
