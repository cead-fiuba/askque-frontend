import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Image from "../images/2.png";
import ManitoArriba from "@material-ui/icons/ThumbUpAlt";
import Seguro from "@material-ui/icons/VerifiedUser";
import Speed from "@material-ui/icons/ShutterSpeed";
import { withRouter } from "react-router-dom";
import { AppContextConsumer } from "../context/context";
import TeacherHome from "./TeacherHome";
import AppBarCustom from "./AppBar";
import CreateIcon from "@material-ui/icons/Create";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import MyButton from "./common/MyButton";

const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  body: {
    backgroundImage: ` url(${Image})`,
    backgroundColor: "#7fc7d9",
    backgroundPosition: "center",
    backgroundSize: "conver",
    padding: "10%",
    marginTop: theme.spacing(6)
  },
  buttons: {
    marginTop: theme.spacing(4),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginRight: theme.spacing(1),
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

  const style = styles();
  return (
    <React.Fragment>
      <AppBarCustom />
      {false ? (
        <TeacherHome />
      ) : (
        <React.Fragment>
          <main className={style.body}>
            <Typography
              variant="h2"
              align="center"
              gutterBottom
              marked="center"
              style={{ color: "white" }}
            >
              QuizFIUBA
            </Typography>
            <span
              style={{
                width: "73px",
                height: "5px",
                margin: "8px auto 8px",
                display: "block",
                backgroundColor: "#0CAAF3",
              }}
            ></span>
            <Typography
              variant="h6"
              align="center"
              paragraph
              style={{ color: "white", padding: "2%" }}
            >
              Aplicación para crear preguntas educativas de manera sencilla y
              rápida.
            </Typography>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              direction="column"
            >
              <Grid item xs={9}>
                <MyButton
                  onClick={() =>
                    redirectTo(
                      props.context.state.isLogged
                        ? "/create-questionary"
                        : "/login"
                    )
                  }
                  fullWidth={true}
                  className={style.buttons}
                  text="Crear cuestionario"
                  leftIcon={<CreateIcon />}
                  show={
                    !props.context.state.isLogged ||
                    props.context.state.isTeacher
                  }
                />
                <MyButton
                  onClick={() =>
                    redirectTo(
                      props.context.state.isLogged
                        ? "/my-questionaries"
                        : "/login"
                    )
                  }
                  leftIcon={<QuestionAnswerIcon />}
                  text="Mis cuestionarios"
                  fullWidth={true}
                  className={style.buttons}
                  show={
                    props.context.state.isLogged &&
                    props.context.state.isTeacher
                  }
                />
                <MyButton
                  onClick={() =>
                    redirectTo(
                      props.context.state.isLogged
                        ? "/ask-questionary"
                        : "/login"
                    )
                  }
                  fullWidth={true}
                  text="Responder cuestionario"
                  className={style.buttons}
                  show={
                    !(
                      props.context.state.isLogged &&
                      props.context.state.isTeacher
                    )
                  }
                />
                <MyButton
                  onClick={() =>
                    redirectTo(
                      props.context.state.isLogged ? "/my-answers" : "/login"
                    )
                  }
                  fullWidth={true}
                  text="Mis respuestas"
                  className={style.buttons}
                  show={
                    props.context.state.isLogged &&
                    !props.context.state.isTeacher
                  }
                />
              </Grid>
            </Grid>
          </main>
          <Grid container spacing={2}>
            <Grid item sm={4} xs={12}>
              <Grid container alignItems="center" direction="column">
                <Grid item>
                  <Typography
                    variant="h5"
                    align="center"
                    color="textSecondary"
                    paragraph
                    style={{ marginTop: "40px" }}
                  >
                    Fácil
                  </Typography>
                </Grid>
                <Grid item>
                  <ManitoArriba
                    style={{ fontSize: "120px" }}
                    color="secondary"
                  ></ManitoArriba>
                </Grid>
                <Grid item>
                  <Typography
                    variant="h6"
                    align="center"
                    color="textSecondary"
                    style={{ padding: "10%" }}
                    paragraph
                  >
                    Muy facil de usar que obtener el código del askque y listo!
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={4} xs={12}>
              <Grid container alignItems="center" direction="column">
                <Grid item>
                  <Typography
                    variant="h5"
                    align="center"
                    color="textSecondary"
                    paragraph
                    style={{ marginTop: "40px" }}
                  >
                    Rapido
                  </Typography>
                </Grid>
                <Grid item>
                  <Speed
                    style={{ fontSize: "120px" }}
                    color="secondary"
                  ></Speed>
                </Grid>
                <Grid item>
                  <Typography
                    variant="h6"
                    align="center"
                    color="textSecondary"
                    style={{ padding: "10%" }}
                    paragraph
                  >
                    No es necesario obtener ningún link, solo con el código ya
                    podes completar el askque
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={4} xs={12}>
              <Grid container alignItems="center" direction="column">
                <Grid item>
                  <Typography
                    variant="h5"
                    align="center"
                    color="textSecondary"
                    paragraph
                    style={{ marginTop: "40px" }}
                  >
                    Seguro
                  </Typography>
                </Grid>
                <Grid item>
                  <Seguro
                    style={{ fontSize: "120px" }}
                    color="secondary"
                  ></Seguro>
                </Grid>
                <Grid item>
                  <Typography
                    variant="h6"
                    align="center"
                    color="textSecondary"
                    style={{ padding: "10%" }}
                    paragraph
                  >
                    Muy facil de usar que obtener el código del askque y listo!
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <footer className={style.footer}>
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
            >
              Built by CETEC.
            </Typography>
          </footer>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default withRouter((props) => (
  <AppContextConsumer>
    {(contextData) => <Home {...props} context={contextData} />}
  </AppContextConsumer>
));
