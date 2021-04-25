import React, { useState, useEffect, Fragment } from "react";
import AppBar from "./AppBar";
import { getResponseOfStudent } from "../service/ResponseService";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ResponseCard from "./ResponseCard";
import Button from "@material-ui/core/Button";
import { withRouter, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  gridContainer: {
    marginTop: theme.spacing(10),
  },
  loadingMessage: {
    marginTop: theme.spacing(3),
  },
  askQuestionaryButton: {
    marginTop: theme.spacing(3),
  },
}));

const MyAnswersView = (props) => {
  const [myAnswers, setMyAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    fetchMyAnswers(setMyAnswers, setLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchMyAnswers]);

  const styles = useStyles();
  return (
    <div>
      <AppBar position="static" />
      <Container maxWidth="sm" component="main" className={styles.container}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          className={styles.gridContainer}
        >
          {loading ? (
            <>
              <CircularProgress thickness={5.0} />
              <div className={styles.loadingMessage}>
                Obteniendo tus respuestas...
              </div>
            </>
          ) : (
            <>
              {myAnswers.length === 0 ? (
                <Fragment>
                  <div>Todavia no respondiste ninguna encuesta</div>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => history.push("/ask-questionary")}
                    className={styles.askQuestionaryButton}
                  >
                    Responder encuesta
                  </Button>
                </Fragment>
              ) : (
                myAnswers.map((answer, idx) => (
                  <ResponseCard answer={answer} key={idx} />
                ))
              )}
            </>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default withRouter((props) => <MyAnswersView {...props} />);

function fetchMyAnswers(setMyAnswers, setLoading) {
  getResponseOfStudent().then((response) => {
    console.log("set");
    const answers = response.data.answers;
    setMyAnswers(answers);
    setLoading(false);
  });
}
