import React, { useState, useEffect } from "react";
import AppBar from "./AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { getAnswersOfQuestionary } from "../service/ResponseService";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(10),
  },
  loadingMessage: {
    marginTop: theme.spacing(3),
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  isCorrectOrNotIcon: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  notShowResultMessage: {
    marginBottom: theme.spacing(2),
  },
}));

const AnswerOfQuestionaryView = (props) => {

  const { hash } = useParams();

  const styles = useStyles();
  const [answer, setAnswer] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnswersOfQuestionaryWithQuestionaryInfo(
      hash,
      setAnswer,
      setLoading
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchAnswersOfQuestionaryWithQuestionaryInfo, hash]);

  const optionsIsOk = (option, optionsSelected) => {
    console.log("optionsSelected", optionsSelected);
    const isIncluide = optionsSelected.includes(option.id.toString());
    return option.correct === isIncluide;
  };

  const createOptions = (options, optionsSelected, canShowResult) => {
    console.log("questionId", optionsSelected);
    return options.map((option) => {
      console.log("id", option.id);
      return (
        <ListItem key={option.id} role={undefined} dense button>
          <ListItemIcon>
            <>
              {canShowResult ? (
                optionsIsOk(option, optionsSelected) ? (
                  <CheckIcon className={styles.isCorrectOrNotIcon} />
                ) : (
                  <CloseIcon className={styles.isCorrectOrNotIcon} />
                )
              ) : null}
              <Checkbox
                edge="start"
                checked={optionsSelected.includes(option.id.toString())}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": option.id }}
              />
            </>
          </ListItemIcon>
          <ListItemText id={option.id} primary={option.text} />
        </ListItem>
      );
    });
  };

  return (
    <>
      <AppBar position="static" />
      <Container maxWidth="sm" component="main" className={styles.container}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
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
              {!answer.questionary.can_show_result && (
                <Typography
                  variant="overline"
                  gutterBottom
                  className={styles.notShowResultMessage}
                >
                  Todavía no podes ver los resultados del cuestionario, una vez
                  que el docente los habilite, actualice la página
                </Typography>
              )}
              {answer.questionary.questions.map(
                ({ id, text, options, has_image, image_url }) => (
                  <Grid item key={id}>
                    <div>
                      {has_image && (
                        <img
			  alt=""
                          src={image_url}
                          style={{
                            objectFit: "contain",
                            maxWidth: "100%",
                            height: "auto",
                          }}
                        />
                      )}
                    </div>

                    <Typography variant="body2" gutterBottom>
                      <b> {text} </b>
                    </Typography>
                    <List className={styles.list}>
                      {createOptions(
                        options,
                        answer.question_responses.flatMap((q) => q.optionIds),
                        answer.questionary.can_show_result
                      )}
                    </List>
                  </Grid>
                )
              )}
            </>
          )}
        </Grid>
      </Container>
    </>
  );
};

function fetchAnswersOfQuestionaryWithQuestionaryInfo(
  questionaryHash,
  setAnswer,
  setLoading
) {
  setLoading(true);
  getAnswersOfQuestionary(questionaryHash).then((response) => {
    const answer = response.data.answers[0];
    setAnswer(answer);
    setLoading(false);
  });
}

export default AnswerOfQuestionaryView;
