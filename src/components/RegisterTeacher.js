import React from 'react';
import GoogleButton from 'react-google-button'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import GoogleLogin from 'react-google-login';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';


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
        value: 'JTP',
        label: 'JTP',
    },
    {
        value: 'Ayudante 1º',
        label: 'Ayudante 1º',
    },
    {
        value: 'Ayudante 2º',
        label: 'Ayudante 2º',
    },
    {
        value: 'Jefe de catedra',
        label: 'Jefe de catedra',
    },
];


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const materias = [
    'Fisica I',
    'Fisica II',
    'Analisis Matematico II',
    'Quimica I'
];

export default function RegisterTeacher() {

    const [values, setValue] = React.useState({
        showGoogleButton: true,
        name: '',
        ocupation: 'Jefe de catedra',
        personName: [],
        email: ''
    });

    const theme = useTheme();


    function handleChange(event) {
        setValue({ personName: event.target.value })
    }

    const responseGoogle = (response) => {
        console.log(response);
        console.log(response.w3.U3);
        setValue({ ...values, showGoogleButton: false, name: response.w3.ig, email: response.w3.U3 })
    }

    function getStyles(name, personName, theme) {
        console.log('personName', personName);
        console.log('values', values)
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
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
                        clientId="1019588126312-sfdo9uujk907immg83anf734ft1dae67.apps.googleusercontent.com"
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
                        //onChange={handleChange('currency')}
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

                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="select-multiple-chip">Chip</InputLabel>
                        <Select
                            multiple
                            value={values.personName}
                            onChange={handleChange}
                            input={<Input id="select-multiple-chip" />}
                            variant="outlined"
                            renderValue={selected => {
                                console.log('selected', selected)
                                return < div className={classes.chips}>
                                    {selected.map(value => (
                                        <Chip key={value} label={value} className={classes.chip} />
                                    ))}
                                </div>
                            }}
                            MenuProps={MenuProps}
                        >
                            {materias.map(name => (
                                <MenuItem key={name} value={name} style={getStyles(name, values.personName, theme)}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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

                    <Button variant="contained" color="secondary" fullWidth className={classes.createAcccountButton}>
                        Crear cuenta AskQue
            </Button>
                </div>}
        </Container>
    </div >
}