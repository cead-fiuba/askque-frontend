import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    createAcccountButton: {
        marginTop: theme.spacing(2),
    }
}));

export default function RegisterStudent() {

    const classes = useStyles();

    return <div>
        <Container component="main" >
            <Typography variant="body2" gutterBottom>
                Es necesario tener una cuenta para poder response un Askque
        </Typography>
            <TextField
                id="standard-name"
                label="Padrón"
                margin="normal"
                variant="outlined"
                fullWidth
            />
            <TextField
                id="standard-name"
                label="Nombre"
                margin="normal"
                fullWidth
                variant="outlined"
            />
            <TextField
                id="standard-name"
                label="Apellido"
                margin="normal"
                fullWidth
                variant="outlined"
            />
            <TextField
                id="standard-name"
                label="Email"
                margin="normal"
                fullWidth
                variant="outlined"
                type="email"
            />
            <TextField
                id="password"
                label="Contraseña"
                type="password"
                autoComplete="current-password"
                margin="normal"
                fullWidth
                variant="outlined"
            />

            <Button variant="contained" color="secondary" fullWidth className={classes.createAcccountButton}>
                Crear cuenta AskQue
            </Button>
        </Container>
    </div>
}