import React from 'react';
import GoogleButton from 'react-google-button'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
    googleButton: {
        width: '100% !important',
        marginTop: theme.spacing(7),
        marginBottom: theme.spacing(9)
    }
}));

export default function RegisterTeacher() {

    const classes = useStyles();
    return <div>
        <Container component="main" >
            <Typography variant="body2" gutterBottom>
                Para ingresar como docente es necesario que ingrese con el email institucional de la
                facultad @fi.uba.ar
            </Typography>
            <GoogleButton
                className={classes.googleButton}
                label='Continua con Google'
            >
            </GoogleButton>
        </Container>
    </div>
}