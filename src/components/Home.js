import React from 'react';
import Button from '@material-ui/core/Button';
import AppBar from "./AppBar"
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Send, Pencil } from 'mdi-material-ui'
import { makeStyles } from '@material-ui/core/styles';






const styles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  body: {
    marginTop: theme.spacing(4),
  },
  buttons: {
    marginTop: theme.spacing(4)
  },
  leftIcon: {
    marginLeft: theme.spacing(1)
  },
  rightIcon: {
    marginRight: theme.spacing(1)
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));



export default function Home(props) {

  function redirectTo(newPath) {
    props.history.push(newPath);
  }

  const style = styles()
  return <div>
    <AppBar
      position="static"
    />
    <main className={style.body}>
      <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
        ASKQUE
      </Typography>
      <Typography variant="h6" align="center" color="textSecondary" paragraph>
        Aplicación para crear preguntas educativas de manera sencilla y rápida. Esta aplicación
        se utilizará en la Facultad de Ingenieria de la UBA
      </Typography>
      <Grid container
        justify="space-between"
        alignItems="center"
        direction="column"
      >
        <Grid item

        >
          <Button variant="contained" color="secondary" size="large"
            onClick={() => { redirectTo("/create-questionary") }}
          >
            <Send className={style.leftIcon} />
            Crear AskQue
            </Button>
        </Grid>
        <Grid item
          className={style.buttons}
        >
          <Button variant="contained" color="secondary" size="large"
            onClick={() => { redirectTo("/ask-questionary") }}
          >
            <Pencil className={style.leftIcon} />
            Responder AskQue
          </Button>
        </Grid>
      </Grid>
    </main>
    <footer className={style.footer}>
      <Typography variant="subtitle1" align="center" color="textSecondary">
        Builded by CETEC
        </Typography>
    </footer>
  </div >
}