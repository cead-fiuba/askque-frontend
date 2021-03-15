import React, { useEffect, useState } from "react";
import "../style/style.scss";
import AppBar from "./AppBar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AskqueResumen from "./AskqueResume";
import { getInformationOfQuestionaryWithCache } from "../service/QuestionaryService";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import CompleteQuestionary from "./CompleteQuestionary";
import { useParams } from 'react-router-dom';

export default function AskQuestionaryView(props) {
  const { hash } = useParams();
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
    const isComplete = hash !== undefined && hash !== null && hash.length === 3;
    if (isComplete) {
      setState(state => ({ ...state, questionaryHash: hash }));
      getInformationOfQuestionaryWithCache(hash).then((response) => {
        setState(state => ({
          ...state,
          questionaryHash: hash,
          showResume: true,
          showInformation: false,
          questionaryName: response.data.name,
          questionaryModulo: response.data.module,
          questionaryTime: response.data.time,
          quantityQuestions: response.data.questions.length,
          questionary: response.data,
        }));
        console.log(state.showInformation); 
      });
    }
  // eslint-disable-next-line
  }, [hash]);

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
      console.log(state.showResume)
    } else {
      setState({ 
        ...state, 
        questionaryHash: hash,
        showResume: false
      });
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
    <div>
      <AppBar position="static" />
      <Grid 
        container 
        alignItems="center" 
        justify="center" 
        spacing={3} 
        style={{ marginTop: "10%" }}
      >
        <Grid item xs={10}>
          {state.showInformation ? (
            <Typography
              variant="h4"
              align="center"
              color="textPrimary"
              gutterBottom
              style={{ marginTop: "1em" }}
            >
              Ingrese el codigo del cuestionario:
            </Typography>
          ) : null}
        </Grid>
        <Grid item xs={6}>
          {state.showInformation ? (
            <TextField
              fullWidth={true}
              maxLength="3"
              variant="outlined"
              InputProps={{style: {fontSize: 40}}}
              value={state.questionaryHash}
              onChange={handleChange}
            />
          ) : null}
        </Grid>
        <Grid container alignItems="center" justify="center">
          {state.showResume ? (
            <div>
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
                Comenzar
              </Button>
            </div>
          ) : null}

          {state.startCompleteQuestionary ? (
            <CompleteQuestionary
              hash={state.questionaryHash}
              questionary={state.questionary}
            />
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
}


/*        setState({
          ...state,
          questionaryHash: hash,
          showResume: true,
          questionaryName: response.data.name,
          questionaryModulo: response.data.module,
          questionaryTime: response.data.time,
          quantityQuestions: response.data.questions.length,
          questionary: response.data,
        });*/
