import React, { useEffect, useState } from "react";
import "../style/style.scss";
import AppBar from "./AppBar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AskqueResumen from "./AskqueResume";
import { getInformationOfQuestionaryWithCache } from "../service/QuestionaryService";
import Button from "@material-ui/core/Button";
import CompleteQuestionary from "./CompleteQuestionary";

export default function AskQuestionaryView(props) {
  const [state, setState] = useState({
    questionaryHash: "",
    showLoading: false,
    showInformation: true,
    showResume: false,
    questionaryName: null,
    questionaryModulo: null,
    startCompleteQuestionary: false,
    questionary: null,
  });

  useEffect(() => {
    const hash = props.match.params.hash;
    const isComplete = hash !== undefined && hash !== null && hash.length === 3;
    if (isComplete) {
      getInformationOfQuestionaryWithCache(hash).then((response) => {
        setState({
          ...state,
          questionaryHash: hash,
          showResume: true,
          questionaryName: response.data.name,
          questionaryModulo: response.data.module,
          questionaryTime: response.data.time,
          quantityQuestions: response.data.questions.length,
          questionary: response.data,
        });
      });
    }
  }, [props.match.params.hash]);

  const handleChange = (e) => {
    console.log(e.target.value);
    const hash = e.target.value.toUpperCase();
    const isComplete = hash.length === 3;
    if (isComplete) {
      getInformationOfQuestionaryWithCache(hash).then((response) => {
        setState({
          ...state,
          questionaryHash: hash,
          showResume: true,
          questionaryName: response.data.name,
          questionaryModulo: response.data.module,
          questionaryTime: response.data.time,
          quantityQuestions: response.data.questions.length,
          questionary: response.data,
        });
      });
    } else {
      setState({ ...state, questionaryHash: hash });
    }
  };

  const startComplete = () => {
    setState({
      ...state,
      showInformation: false,
      showResume: false,
      startCompleteQuestionary: true,
    });
  };

  return (
    <>
      <AppBar position="static" />
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ marginTop: "10%" }}
      >
        {state.showInformation ? (
          <Typography
            variant="h4"
            align="center"
            color="textPrimary"
            gutterBottom
            style={{ marginTop: "1em" }}
          >
            Ingrese la clave del cuestionario
          </Typography>
        ) : null}

        <Grid item xs={12}>
          {state.showInformation ? (
            <input
              id="input-askque-code"
              type="text"
              maxLength="3"
              value={state.questionaryHash}
              onChange={handleChange}
            />
          ) : null}
        </Grid>
        <Grid container alignItems="center" justify="center">
          {state.showResume ? (
            <>
              <AskqueResumen
                name={state.questionaryName}
                module={state.questionaryModulo}
                code={state.questionaryHash}
                time={state.questionaryTime}
                date={state.questionary.date}
                quantityQuestions={state.quantityQuestions}
              />

              <Typography variant="subtitle1" color="textSecondary">
                Tenes {state.questionaryTime} minutos para responder{" "}
                {state.quantityQuestions} preguntas!
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ margin: "5%" }}
                onClick={startComplete}
              >
                Estoy listo
              </Button>
            </>
          ) : null}

          {state.startCompleteQuestionary ? (
            <CompleteQuestionary
              hash={state.questionaryHash}
              questionary={state.questionary}
            />
          ) : null}
        </Grid>
      </Grid>
    </>
  );
}
