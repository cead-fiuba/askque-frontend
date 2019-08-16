import React from 'react';
import GoogleButton from 'react-google-button'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import GoogleLogin from 'react-google-login';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { createTeacher } from "../service/TeacherService"
import { withRouter } from 'react-router-dom'
import { AppContextConsumer } from '../context/context'

const useStyles = makeStyles(theme => ({
    googleButton: {
        width: '100% !important',
        marginTop: theme.spacing(7),
        marginBottom: theme.spacing(9)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    }, chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    createAcccountButton: {
        marginTop: theme.spacing(2),
    }
}));

const currencies = [
    {
        value: 2,
        label: 'JTP',
    },
    {
        value: 1,
        label: 'Ayudante',
    },
    {
        value: 0,
        label: 'Profesor',
    },
];


function RegisterTeacher(props) {

    const [values, setValue] = React.useState({
        showGoogleButton: true,
        name: '',
        ocupation: '',
        email: ''
    });

    function redirectTo(newPath) {
        props.history.push(newPath);
    }

    const handleChange = name => event => {
        setValue({ ...values, [name]: event.target.value })
    }

    const responseGoogle = (response) => {
        console.log(response);
        console.log(response.w3.U3);
        setValue({ ...values, showGoogleButton: false, name: response.w3.ig, email: response.w3.U3 })
    }

    const createAccount = () => {
        const teacher = {
            ocupation: values.ocupation,
            email: values.email,
            name: values.name
        }

        createTeacher(teacher).then((response) => {
            console.log('entro en el then')
            console.log('props', props)
            props.context.changeIsLogged()
            redirectTo("/my-askques")
        }).catch((error) => {
            console.log('Algo paso mal', error)
        })

    }

    const classes = useStyles();
    return <div>
        <Container component="main" >
            {values.showGoogleButton ?
                <>
                    <Typography variant="body2" gutterBottom>
                        Para ingresar como docente es necesario que ingrese con el email institucional de la
                        facultad @fi.uba.ar
                    </Typography>
                    <GoogleLogin
                        clientId="1019588126312-j8jtlv1q4a6djif45aumgnoao3m1mk12.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        render={renderProps => (
                            <GoogleButton
                                className={classes.googleButton}
                                label='Continua con Google'
                                onClick={renderProps.onClick}
                            >
                            </GoogleButton>
                        )}
                    /></>
                : <div>
                    Hola {values.name}! estamos a un paso de terminar!

                    <TextField
                        id="standard-select-currency"
                        select
                        label="Cargo"
                        className={classes.textField}
                        value={values.ocupation}
                        variant="outlined"
                        onChange={handleChange('ocupation')}
                        SelectProps={{
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        helperText="Por favor seleccione el cargo"
                        margin="normal"
                        fullWidth
                    >
                        {currencies.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        disabled
                        id="outlined-disabled"
                        label="email"
                        defaultValue={values.email}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                    />

                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        className={classes.createAcccountButton}
                        onClick={createAccount}
                    >
                        Crear cuenta AskQue
                    </Button>
                </div>}
        </Container>
    </div >
}


export default withRouter((props) => (
    <AppContextConsumer>
        {
            contextData => (<RegisterTeacher {...props} context={contextData} />)
        }
    </AppContextConsumer>))
