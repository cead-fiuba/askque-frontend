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

    const [values, setValues] = React.useState({
        name: '',
        lastName: '',
        email: '',
        pass: '',
        emailIsValid: true,
        padron: '202',
        padronIsValid: true,
        padronHelperText: ''
    });


    function validateEmail(email) {
        // eslint-disable-next-line
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }


    const handleChange = name => event => {
        if (name === 'padron') {
            console.log('padron', event.target.value)
            const isValid = !isNaN(Number(event.target.value))
            const helperMessage = isValid ? '' : 'Debe ser un número';
            console.log('isValid', isValid)
            setValues({
                ...values,
                padronIsValid: isValid,
                [name]: event.target.value,
                padronHelperText: helperMessage
            })
        } else if (name === 'email') {
            const isValid = validateEmail(event.target.value)
            setValues({ ...values, [name]: event.target.value, emailIsValid: isValid })
        } else {
            setValues({ ...values, [name]: event.target.value })
        }
    }


    const classes = useStyles();

    return <div>
        <Container component="main" >
            <Typography variant="body2" gutterBottom>
                Es necesario tener una cuenta para poder response un Askque
        </Typography>
            <TextField
                id="padron"
                label="Padrón"
                margin="normal"
                variant="outlined"
                fullWidth
                value={values.padron}
                onChange={handleChange('padron')}
                error={!values.padronIsValid}
                helperText={values.padronHelperText}
            />
            <TextField
                id="name"
                label="Nombre"
                margin="normal"
                fullWidth
                variant="outlined"
                onChange={handleChange('name')}
                value={values.name}
            />
            <TextField
                id="last-name"
                label="Apellido"
                margin="normal"
                fullWidth
                variant="outlined"
                onChange={handleChange('lastName')}
                value={values.lastName}
            />
            <TextField
                id="email"
                label="Email"
                margin="normal"
                fullWidth
                variant="outlined"
                type="email"
                onChange={handleChange('email')}
                value={values.email}
                error={!values.emailIsValid}
            />
            <TextField
                id="password"
                label="Contraseña"
                type="password"
                autoComplete="current-password"
                margin="normal"
                fullWidth
                variant="outlined"
                onChange={handleChange('pass')}
                value={values.pass}
            />

            <Button variant="contained" color="secondary" fullWidth className={classes.createAcccountButton}>
                Crear cuenta AskQue
            </Button>
        </Container>
    </div>
}
