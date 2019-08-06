import React from 'react';
import Button from '@material-ui/core/Button';
import AppBar from "./AppBar"
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Send, Pencil } from 'mdi-material-ui'
import { makeStyles } from '@material-ui/core/styles';
import Image from "../images/image1.jpg"
import ManitoArriba from '@material-ui/icons/ThumbUpAlt'
import Seguro from '@material-ui/icons/VerifiedUser'
import Speed from '@material-ui/icons/ShutterSpeed'




const styles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  body: {
    // marginTop: theme.spacing(4),
    backgroundImage: ` url(${Image})`,
    backgroundColor: '#7fc7d9',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    paddingTop: '20%',
    paddingBottom: '10%'
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
      position="fixed"
    />
    <main
      className={style.body}
    >
      <Typography
        variant="h3"
        align="center"
        color="primary"
        gutterBottom
        marked="center"
      >
        ENCUESTAS SENCILLAS
      </Typography>
      <span
        style={{ width: '73px', height: '5px', margin: '8px auto 8px', display: 'block', backgroundColor: 'red' }}
      >

      </span>
      <Typography variant="h6" align="center" paragraph color="primary">
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
    <Grid container spacing={2}>
      <Grid item sm={4} xs={12}>
        <Grid container alignItems="center" direction="column">
          <Grid item>
            <Typography variant="h5" align="center" color="textSecondary" paragraph style={{ marginTop: '40px' }}>
              Fácil
            </Typography>
          </Grid>
          <Grid item>
            <ManitoArriba style={{ fontSize: '120px' }} color='secondary'>
            </ManitoArriba>
          </Grid>
          <Grid item>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
              Muy facil de usar que obtener el código del askque y listo!
            </Typography>
          </Grid>
        </Grid>


      </Grid>
      <Grid item sm={4} xs={12}>
        <Grid container alignItems="center" direction="column">
          <Grid item>
            <Typography variant="h5" align="center" color="textSecondary" paragraph style={{ marginTop: '40px' }}>
              Rapido
            </Typography>
          </Grid>
          <Grid item>
            <Speed style={{ fontSize: '120px' }} color='secondary'>
            </Speed>
          </Grid>
          <Grid item>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
              No es necesario obtener ningún link, solo con el código ya podes completar el askque
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={4} xs={12}>
        <Grid container alignItems="center" direction="column">
          <Grid item>
            <Typography variant="h5" align="center" color="textSecondary" paragraph style={{ marginTop: '40px' }}>
              Seguro
            </Typography>
          </Grid>
          <Grid item>
            <Seguro style={{ fontSize: '120px' }} color='secondary'>
            </Seguro>
          </Grid>
          <Grid item>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
              Muy facil de usar que obtener el código del askque y listo!
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    <footer className={style.footer}>
      <Typography variant="subtitle1" align="center" color="textSecondary">
        Builded by CETEC
        </Typography>
    </footer>
  </div >
}