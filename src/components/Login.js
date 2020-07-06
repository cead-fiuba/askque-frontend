import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { initSession } from "../service/LoginService";

import { withRouter } from "react-router-dom";
import { AppContextConsumer } from "../context/context";
import { red } from "@material-ui/core/colors";
import ErrorIcon from "@material-ui/icons/Error";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { MyGoogleButton } from "./GoogleButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const variantIcon = {
  error: ErrorIcon,
};

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorMessage: {
    padding: theme.spacing(2, 2),
    background: red[100],
    color: red[600],
  },
  noAccountPaper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
  },
  linkToCreateAccount: {
    marginLeft: theme.spacing(1),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  signAsTeacherText: {
    marginTop: theme.spacing(2),
  },
  googleButton: {
    width: "100% !important",
    marginTop: theme.spacing(2),
  },
  progress: {
    margin: theme.spacing(2),
  },
}));

const useStyles1 = makeStyles((theme) => ({
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
    display: "flex",
    alignItems: "center",
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
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
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
  variant: PropTypes.oneOf(["error", "info", "success", "warning"]).isRequired,
};

function SignIn(props) {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    email: null,
    password: null,
    showErrorLogin: false,
    errorLoginMessage: "Email o contraseña incorrecto",
  });

  const [rol, setAge] = React.useState();

  const [loading, setLoading] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [userExists, setUserExists] = React.useState();
  const [email, setEmail] = React.useState();
  const [isTeacher, setIsTeacher] = React.useState();

  const redirectTo = (newPath) => {
    props.history.push(newPath);
  };

  const onCallback = (email) => {
    setEmail(email);

    initSession(email)
      .then((res) => {
        console.log("todo ok");
        setOpen(true);
        setUserExists(true);
        console.log("todo ok", res);

        const token = res.token;
        console.log("token", token);
        props.context.setToken(token);
        setIsTeacher(res.is_teacher);
        if (res.is_teacher) {
          props.context.isTeacher();
        }
        props.context.setEmail(email);
      })
      .catch((reason) => {
        console.log("todo mal :(");
        setOpen(true);
      });
  };

  const handleOnClose = () => {
    setValues({ ...values, showErrorLogin: false });
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {loading ? "Iniciando sesión" : "Ingresar"}
          </Typography>

          {loading ? (
            <CircularProgress className={classes.progress} />
          ) : (
            <>
              <Typography
                variant="subtitle1"
                align="center"
                className={classes.signAsTeacherText}
              >
                Iniciar sesión con tu correo de google
              </Typography>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                style={{ width: "100%", marginTop: "2%" }}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Rol
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={rol}
                  onChange={(event) => {
                    setAge(event.target.value);
                  }}
                  label="Rol"
                >
                  <MenuItem value={1}>Alumno</MenuItem>
                  <MenuItem value={2}>Docente</MenuItem>
                </Select>
              </FormControl>
              <form className={classes.form} noValidate>
                {values.showErrorLogin ? (
                  <MySnackbarContentWrapper
                    variant="error"
                    className={classes.margin}
                    message={values.errorLoginMessage}
                    onClose={handleOnClose}
                  />
                ) : null}
                <Grid container justify="center" alignItems="center">
                  <Grid item>
                    <MyGoogleButton callback={onCallback} a={1} />{" "}
                  </Grid>
                </Grid>

                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  style={{ marginTop: "2%" }}
                >
                  {rol === 1 && (
                    <>
                      Podes ingresar con tu cuenta{" "}
                      <b>@gmail.com o @fi.uba.ar</b>{" "}
                    </>
                  )}
                  {rol === 2 && (
                    <>
                      Solo poder ingresar con tu cuenta <b>@fi.uba.ar</b>{" "}
                    </>
                  )}
                </Typography>
              </form>
            </>
          )}
        </Paper>
        {!loading && (
          <Paper className={classes.noAccountPaper}>
            <Typography variant="subtitle1">
              ¿Todavia no tenes cuenta?
              <Link
                color="textSecondary"
                className={classes.linkToCreateAccount}
                href="/register"
              >
                Crear cuenta
              </Link>
            </Typography>
          </Paper>
        )}
      </Container>

      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {userExists ? "Inicio de sesión" : "Cuenta invalida"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {userExists ? (
              <>
                Vas a iniciar sesión con esta cuenta: <b> {email} </b> ¿Desea
                continuar?
              </>
            ) : (
              <>
                El email ingresado no es válido, debido a que no encontramos
                ninguna cuenta asociada a <b> {email} </b>
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            autoFocus
            onClick={() => {
              if (userExists) {
                if (isTeacher) {
                  redirectTo("/my-questionaries");
                } else {
                  redirectTo("/ask-questionary");
                }
              } else {
                setOpen(false);
              }
            }}
          >
            {userExists ? "SI, iniciar sesion" : "volver a intentar"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default withRouter((props) => (
  <AppContextConsumer>
    {(contextData) => <SignIn {...props} context={contextData} />}
  </AppContextConsumer>
));
