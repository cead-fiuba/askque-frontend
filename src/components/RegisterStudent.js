import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { createStudent } from "../service/StudentService"
import { withRouter } from 'react-router-dom'
import { AppContextConsumer } from '../context/context'
import { MySnackbarContentWrapper } from './common/MySnackbarContentWrapper'
import { MyGoogleButton } from './GoogleButton'

const useStyles = makeStyles(theme => ({
    createAcccountButton: {
        marginTop: theme.spacing(2),
    },
    googleButton: {
        width: '100% !important',
        marginTop: theme.spacing(7)    
    }
}));

function RegisterStudent(props) {

    const [values, setValues] = React.useState({
        name: '',
        email: '',
        emailIsValid: true,
        padron: '',
        padronHelperText: '',
        showSnackbarError: false,
        snackbarErrorMessage: null
    });

    const [showForm,setShowForm] = React.useState(false)


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
                props.context.setToken(res.data.token);
                props.context.setEmail(values.email);
                goTo('/ask-questionary')
            }).catch((e) => {
                console.log('algo salio mal al crear la cuenta', e.response)
                if (e.response.status === 400) {
                    setValues({ ...values, showSnackbarError: true, snackbarErrorMessage: 'Email ya registrado' })
                }
            })
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
        } else {
            setValues({ ...values, [name]: event.target.value })
        }
    }

    const responseGoogle = (response) => {
        console.log(response);
        console.log(response.profileObj);
        const personalInformation = response.profileObj;
        const email = personalInformation.email;
        if (email.endsWith("fi.uba.ar")) {
            setValues({...values, name : personalInformation.name, email : email})
            setShowForm(true)
        } else {
            console.log("el email es invalido")
        }
    }


    const classes = useStyles();

    return <div>
        <Container component="main" >
            <Typography variant="body2" gutterBottom>
                Es necesario tener una cuenta para poder responder las encuestas. Para crear
                la es necesario que tengas un email @fi.uba.ar
            </Typography>

            {
                values.showSnackbarError &&
                <>
                    <MySnackbarContentWrapper
                        variant="error"
                        message={values.snackbarErrorMessage}
                        open={values.showSnackbarError}
                    />
                </>
            }

            {
                showForm ? <>
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
                />

                <Button
                    variant='contained'
                    color="primary"
                    fullWidth
                    className={classes.createAcccountButton}
                    onClick={createStudentAccount}
                >
                    Crear cuenta
                </Button>

                </>:
                <MyGoogleButton
                    handleResponseGoogle={responseGoogle}
                    style={classes.googleButton}
                />
        }
        </Container>
    </div>
}


export default withRouter((props) => (
    <AppContextConsumer>
        {
            contextData => (<RegisterStudent {...props} context={contextData} />)
        }
    </AppContextConsumer>))