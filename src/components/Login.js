import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { initSession } from "../service/LoginService"
import { withRouter } from 'react-router-dom'
import { AppContextConsumer } from '../context/context'
import { red } from '@material-ui/core/colors';
import ErrorIcon from '@material-ui/icons/Error';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';


const variantIcon = {
  error: ErrorIcon
};

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorMessage: {
    padding: theme.spacing(2, 2),
    background: red[100],
    color: red[600]
  },
  noAccountPaper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4)
  },
  linkToCreateAccount: {
    marginLeft: theme.spacing(1)
  }
}));

const useStyles1 = makeStyles(theme => ({
  error: {
    backgroundColor: red[300],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));
function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};



function SignIn(props) {
  const classes = useStyles();


  const [values, setValues] = React.useState({
    email: null,
    password: null,
    showErrorLogin: false
  });

  const redirectTo = (newPath) => {
    props.history.push(newPath);
  }

  const onChange = field => event => {
    setValues({ ...values, [field]: event.target.value })
  }

  const login = () => {
    initSession({ email: values.email, password: values.password }).then((token) => {
      props.context.setToken(token)
      redirectTo("/ask-questionary")
    }).catch((e) => {
      setValues({ ...values, showErrorLogin: true })
    });
  }


  const handleOnClose = () => {
    setValues({ ...values, showErrorLogin: false })
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Ingresar
        </Typography>
        <form className={classes.form} noValidate>
          {
            values.showErrorLogin ?
              <MySnackbarContentWrapper
                variant="error"
                className={classes.margin}
                message="Email o contraseña incorrecto"
                onClose={handleOnClose}
              /> :
              null
          }
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onChange('email')}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onChange('password')}
          />
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={login}
          >
            Ingresar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link variant="body2" color="textSecondary">
                ¿Olvidaste la contraseña?
              </Link>
            </Grid>
            <Grid item>
              <Link variant="body2" color="textSecondary" to="/register">
                Registrarse
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Paper className={classes.noAccountPaper}>
        <Typography variant="subtitle1">
          Todavia no tenes cuenta?
          <Link color="textSecondary" className={classes.linkToCreateAccount} href='/register'>
            Crear cuenta
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default withRouter((props) => (
  <AppContextConsumer>
    {
      contextData => (<SignIn {...props} context={contextData} />)
    }
  </AppContextConsumer>))