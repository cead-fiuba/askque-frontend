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
}));

function SignIn(props) {
  const classes = useStyles();


  const [values, setValues] = React.useState({
    email: null,
    password: null
  });

  const redirectTo = (newPath) => {
    props.history.push(newPath);
  }

  const onChange = field => event => {
    setValues({ ...values, [field]: event.target.value })
  }

  const login = () => {
    initSession({ email: values.email, password: values.password }).then((res) => {
      props.context.setToken(res.data.token);
      redirectTo("/ask-questionary")
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Ingresar
        </Typography>
        <form className={classes.form} noValidate>
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
      </div>
    </Container>
  );
}

export default withRouter((props) => (
  <AppContextConsumer>
    {
      contextData => (<SignIn {...props} context={contextData} />)
    }
  </AppContextConsumer>))