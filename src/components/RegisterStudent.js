import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import GoogleButton from 'react-google-button'

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    googleButton: {
        width: '100% !important',
        marginTop: theme.spacing(7),
        marginBottom: theme.spacing(9)
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
                fullWidth
            />
            <TextField
                id="standard-name"
                label="Nombre"
                margin="normal"
                fullWidth
            />
            <TextField
                id="standard-name"
                label="Apellido"
                margin="normal"
                fullWidth
            />
            <TextField
                id="standard-name"
                label="Email"
                margin="normal"
                fullWidth
            />
            <TextField
                id="filled-password-input"
                label="Contraseña"
                type="password"
                autoComplete="current-password"
                margin="normal"
                fullWidth
            />
        </Container>
    </div>
}