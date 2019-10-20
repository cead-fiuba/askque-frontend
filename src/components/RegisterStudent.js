import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { createStudent } from "../service/StudentService"
import { withRouter } from 'react-router-dom'
import { AppContextConsumer } from '../context/context'
import { MySnackbarContentWrapper } from './MySnackbarContentWrapper'

const useStyles = makeStyles(theme => ({
    createAcccountButton: {
        marginTop: theme.spacing(2),
    }
}));

function RegisterStudent(props) {

    const [values, setValues] = React.useState({
        name: '',
        lastName: '',
        email: '',
        pass: '',
        emailIsValid: true,
        padron: '',
        padronIsValid: true,
        padronHelperText: '',
        showSnackbarError: false,
        snackbarErrorMessage: null
    });


    const goTo = (value) => {
        props.history.push(value)
    }

    const createStudentAccount = () => {
        const student = {
            name: values.name,
            email: values.email,
            password: values.pass,
            padron: Number(values.padron)
        }
        createStudent(student)
            .then((res) => {
                goTo('/ask-questionary')
                props.context.setToken(res.data.token);
            }).catch((e) => {
                console.log('algo salio mal al crear la cuenta', e.response.status === 400)
                if (e.response.status === 400) {
                    setValues({ ...values, showSnackbarError: true, snackbarErrorMessage: 'Email ya registrado' })
                }
            })
    }


    function validateEmail(email) {
        // eslint-disable-next-line
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }


    const handleChange = name => event => {
        if (name === 'padron') {
            const isValid = !isNaN(Number(event.target.value))
            const helperMessage = isValid ? '' : 'Debe ser un número';
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

            {
                values.showSnackbarError ?
                    <MySnackbarContentWrapper
                        variant="error"
                        message={values.snackbarErrorMessage}
                    /> : null
            }
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
                label="Nombre Completo"
                margin="normal"
                fullWidth
                variant="outlined"
                onChange={handleChange('name')}
                value={values.name}
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

            <Button
                variant='contained'
                color="primary"
                fullWidth
                className={classes.createAcccountButton}
                onClick={createStudentAccount}
            >
                Crear cuenta AskQue
            </Button>
        </Container>
    </div>
}


export default withRouter((props) => (
    <AppContextConsumer>
        {
            contextData => (<RegisterStudent {...props} context={contextData} />)
        }
    </AppContextConsumer>))