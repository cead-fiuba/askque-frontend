import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Send, Pencil } from 'mdi-material-ui'
import { makeStyles } from '@material-ui/core/styles';
import Image from "../images/2.png"
import ManitoArriba from '@material-ui/icons/ThumbUpAlt'
import Seguro from '@material-ui/icons/VerifiedUser'
import Speed from '@material-ui/icons/ShutterSpeed'
import { withRouter } from 'react-router-dom'
import { AppContextConsumer } from "../context/context"
import TeacherHome from './TeacherHome'
import AppBarCustom from "./AppBar"
import CreateIcon from '@material-ui/icons/Create';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

const styles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  body: {
    // marginTop: theme.spacing(4),
    backgroundImage: ` url(${Image})`,
    backgroundColor: '#7fc7d9',
    backgroundPosition: 'center',
    backgroundSize: 'conver',
    paddingTop: '10%',
    paddingBottom: '10%'
  },
  buttons: {
    marginTop: theme.spacing(4)
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    marginRight: theme.spacing(1)
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));



function Home(props) {

  function redirectTo(newPath) {
    props.history.push(newPath);
  }

  const style = styles()
  return <React.Fragment>
    <AppBarCustom />
    {false ?
      <TeacherHome /> :
      <React.Fragment>
        <main
          className={style.body}
        >
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            marked="center"
            style={{ color: 'white' }}
          >
            QuizFIUBA
    </Typography>
          <span
            style={{ width: '73px', height: '5px', margin: '8px auto 8px', display: 'block', backgroundColor: '#0CAAF3' }}
          >

          </span>
          <Typography variant="h6" align="center" paragraph style={{ color: 'white' }}>
            Aplicación para crear preguntas educativas de manera sencilla y rápida. Esta aplicación
            se utilizará en la Facultad de Ingenieria de la UBA
    </Typography>
          <Grid container
            justify="space-between"
            alignItems="center"
            direction="column"
          >
            <Grid
              item
              xs={9}
            >

              {(!props.context.state.isLogged || props.context.state.isTeacher) &&

                <>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={() => {
                      if (!props.context.state.isLogged) {
                        redirectTo("/login")
                      } else {
                        redirectTo("/create-questionary")
                      }
                    }}
                    className={style.buttons}
                    fullWidth
                  >
                    <CreateIcon className={style.leftIcon} />
                    Crear cuestionario
                </Button>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={() => {
                      if (!props.context.state.isLogged) {
                        redirectTo("/login")
                      } else {
                        redirectTo("/my-questionaries")
                      }
                    }}
                    className={style.buttons}
                    fullWidth
                  >
                    <QuestionAnswerIcon className={style.leftIcon} />
                    Mis cuestionarios
                </Button>
                </>

              }

              {
                !(props.context.state.isLogged && props.context.state.isTeacher) &&
                <Button variant="contained" size="large" color="primary"
                  onClick={() => {
                    if (!props.context.state.isLogged) {
                      redirectTo("/login")
                    } else {
                      redirectTo("/ask-questionary")
                    }

                  }}
                  className={style.buttons}
                  fullWidth
                >
                  <Pencil className={style.leftIcon} />
                  Responder cuestionario
              </Button>
              }


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
      </React.Fragment>
    }
  </React.Fragment>
}

export default withRouter((props) => (
  <AppContextConsumer>
    {
      contextData => (<Home {...props} context={contextData} />)
    }
  </AppContextConsumer>))