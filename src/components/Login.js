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

  const [loading, setLoading] = React.useState(false);

  const redirectTo = (newPath) => {
    props.history.push(newPath);
  };

  const handleResponseGoogle = (res) => {
    console.log(res);
    const email = res.profileObj.email;
    setLoading(true);
    initSession(email)
      .then((res) => {
        console.log("response", res);
        props.context.setToken(res.token);
        props.context.isTeacher(res.is_teacher);
        props.context.setEmail(email);
        if (res.is_teacher) {
          redirectTo("/my-questionaries");
        } else {
          redirectTo("/ask-questionary");
        }
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.response);
        if (e.response !== undefined && e.response.status === 404) {
          setValues({
            ...values,
            showErrorLogin: true,
            errorLoginMessage: "Gmail no válido",
          });
        }
        if (e.response === undefined) {
          setValues({
            ...values,
            showErrorLogin: true,
            errorLoginMessage:
              "Estamos teniendo problemas, por favor intente mas tarde",
          });
        }
      });
  };

  const handleOnClose = () => {
    setValues({ ...values, showErrorLogin: false });
  };

  return (
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
              Iniciar sesión con gmail
            </Typography>
            <form className={classes.form} noValidate>
              {values.showErrorLogin ? (
                <MySnackbarContentWrapper
                  variant="error"
                  className={classes.margin}
                  message={values.errorLoginMessage}
                  onClose={handleOnClose}
                />
              ) : null}
              <MyGoogleButton
                style={classes.googleButton}
                handleResponseGoogle={handleResponseGoogle}
              />
            </form>
          </>
        )}
      </Paper>
      {!loading && (
        <Paper className={classes.noAccountPaper}>
          <Typography variant="subtitle1">
            Todavia no tenes cuenta?
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
  );
}

export default withRouter((props) => (
  <AppContextConsumer>
    {(contextData) => <SignIn {...props} context={contextData} />}
  </AppContextConsumer>
));
