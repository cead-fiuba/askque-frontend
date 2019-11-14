import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { createTeacher } from "../service/TeacherService"
import { withRouter } from 'react-router-dom'
import { AppContextConsumer } from '../context/context'
import { MyGoogleButton } from './GoogleButton'
import { MySnackbarContentWrapper } from './common/MySnackbarContentWrapper'

const useStyles = makeStyles(theme => ({
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
    },
    googleButton: {
        width: '100% !important',
        marginTop: theme.spacing(7),
        marginBottom: theme.spacing(9)
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
        email: '',
        showInicialMessage: true,
        showForm: false
    });

    const [errorConf, setErrorConf] = React.useState({
        showErrorMessage: false,
        errorMessage: '',
        showSnackbarError: false
    })


    function redirectTo(newPath) {
        props.history.push(newPath);
    }

    const handleChange = name => event => {
        setValue({ ...values, [name]: event.target.value })
    }

    const responseGoogle = (response) => {
        console.log(response);
        console.log(response.w3.U3);
        const email = response.w3.U3;
        if (!email.endsWith("fi.uba.ar")) {
            setValue({ ...values, showInicialMessage: false, name: response.w3.ig, email: response.w3.U3 })
            setErrorConf({ showErrorMessage: true, showSnackbarError: true })
        } else {
            setValue({ ...values, showGoogleButton: false, showForm: true, showInicialMessage: false, name: response.w3.ig, email: response.w3.U3 })

        }
    }

    const createAccount = () => {
        const teacher = {
            ocupation: values.ocupation,
            email: values.email,
            name: values.name
        }

        createTeacher(teacher).then((response) => {
            console.log('response', response.data.token)
            props.context.setToken(response.data.token)
            redirectTo("/my-questionaries")
        }).catch((error) => {
            console.log('Algo paso mal', error)
        })

    }

    const classes = useStyles();
    return <div>
        <Container component="main" >
            {values.showInicialMessage &&
                <Typography variant="body2" gutterBottom>
                    Para ingresar como docente es necesario que ingrese con el email institucional de la
                        facultad <b>@fi.uba.ar</b>
                </Typography>
            }
            {
                errorConf.showErrorMessage &&
                <>
                    <MySnackbarContentWrapper
                        variant="error"
                        message={"Email inválido"}
                        open={errorConf.showSnackbarError}
                        onClose={() => { setErrorConf({ ...errorConf, showSnackbarError: false }) }}
                    />
                    <Typography variant="body2" gutterBottom>
                        El email ingresado {values.email} no pertenece a la facultad. Por favor ingrese con un email <b>@fi.uba.ar</b>
                    </Typography>

                    <Typography variant="body2" gutterBottom>
                        Por favor, reintente de nuevo.
                    </Typography>

                </>
            }
            {values.showForm &&
                <div>
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
                        color="primary"
                        fullWidth
                        className={classes.createAcccountButton}
                        onClick={createAccount}
                    >
                        Crear cuenta AskQue
                    </Button>
                </div>}


            {values.showGoogleButton && <MyGoogleButton
                handleResponseGoogle={responseGoogle}
                style={classes.googleButton}
            />}
        </Container>
    </div >
}


export default withRouter((props) => (
    <AppContextConsumer>
        {
            contextData => (<RegisterTeacher {...props} context={contextData} />)
        }
    </AppContextConsumer>))
