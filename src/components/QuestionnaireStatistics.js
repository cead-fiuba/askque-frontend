import React, { useEffect, useState } from "react";
import AppBar from "./AppBar";
import { getResultOfQuestionary } from "../service/TeacherService";
import { getInformationOfQuestionary } from "../service/QuestionaryService";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Typography } from "@material-ui/core";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell,
} from "recharts";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { withRouter } from "react-router-dom";
import { showResultsOfQuestionary } from "../service/QuestionaryService";
import { useSnackbar, SnackbarProvider } from "notistack";

const abecedario = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const correctOptionsByQuestionId = {};

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(4),
  },
  navigationButtons: {
    marginLeft: theme.spacing(2),
  },
  buttonContainer: {
    marginTop: theme.spacing(10),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
}));

function QuestionnaireStatistics(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [questionary, setQuestionary] = useState();
  const [qtyByOptionId, setQtyByOptionId] = useState();
  const [responses, setResponses] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const createCorrectOptionsByQuestionId = (questionaryData) => {
    questionaryData.questions.forEach((question) => {
      const correctOptions = question.options
        .filter((option) => option.correct)
        .map((option) => option.id);
      correctOptionsByQuestionId[question.id] = correctOptions;
    });
  };

  const buildQtyByOptionId = (answers) => {
    const someMap = {};
    answers.forEach((answer) => {
      answer.question_responses.forEach((questionResponse) => {
        questionResponse.optionIds.forEach((optionId) => {
          if (someMap.hasOwnProperty(optionId)) {
            someMap[optionId] = someMap[optionId] + 1;
          } else {
            someMap[optionId] = 1;
          }
        });
      });
    });
    setQtyByOptionId(someMap);
  };

  const calculateHowManyCorrectResponseHasQuestion = (questionId) => {
    const counter = 0;
    console.log("responses",responses)
    responses.forEach((response) => {
      response.question_responses.forEach((questionResponse) => {
        console.log("questionResponse.optionIds",questionResponse.optionIds)
        console.log("correctOptionsByQuestionId",correctOptionsByQuestionId)
        console.log("correctOptionsByQuestionId[questionId]",correctOptionsByQuestionId[questionId])
        if (
          questionResponse.questionId === questionId &&
          questionResponse.optionIds === correctOptionsByQuestionId[questionId]
        ) {
          counter = counter + 1;
        }
      });
    });
    return counter;
  };

  const calculateHowManyCorrectAnswersHasQuestionary = () => {
    var counter = 0;
    responses.forEach((response) => {
      var responseIsCorrect = true;
      response.question_responses.forEach((questionResponse) => {
        const actual = questionResponse.optionIds.map((id) => parseInt(id));
        const should = correctOptionsByQuestionId[questionResponse.questionId];
        if (should !== actual) {
          responseIsCorrect = false;
        }
      });
      if (responseIsCorrect) {
        counter = counter + 1;
      }
    });
    return counter;
  };

  const showResults = () => {
    showResultsOfQuestionary(questionary.hash)
      .then((res) => {
        enqueueSnackbar(`Se mostrará los resultados del  ${questionary.hash}`, {
          variant: "success",
        });
      })
      .catch((reason) => {
        enqueueSnackbar(`No se pudo realizar la acción`, { variant: "error" });
      });
  };

  useEffect(() => {
    const hash = props.match.params.hash;
    const informationPromise = getInformationOfQuestionary(hash);
    const resultPromise = getResultOfQuestionary(props.match.params.hash);

    Promise.all([informationPromise, resultPromise]).then(
      ([informationResponse, resultResponse]) => {
        const questionaryData = informationResponse.data;
        console.log("questionaryData", questionaryData);
        createCorrectOptionsByQuestionId(questionaryData);
        const answers = resultResponse.data.answers;
        setQuestionary(questionaryData);
        buildQtyByOptionId(answers);
        setResponses(answers);
        setLoading(false);
      }
    );

    const interval = setInterval(() => {
      const resultPromise = getResultOfQuestionary(props.match.params.hash);
      resultPromise.then((resultResponse) => {
        const answers = resultResponse.data.answers;
        buildQtyByOptionId(answers);
        setResponses(answers);
        setLoading(false);
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [props.match.params.hash]);

  return (
    <div>
      <AppBar position="static" />
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className={classes.buttonContainer}
      >
        <Grid item xs={2}>
          <Button
            className={classes.navigationButtons}
            color="primary"
            variant="contained"
            onClick={() => props.history.push("/my-questionaries")}
          >
            <ArrowBackIcon className={classes.leftIcon} />
            Regresar
          </Button>
        </Grid>
        <Grid item xs={8} />
        <Grid item xs={2}>
          {questionary && !questionary.can_show_result && (
            <Button
              className={classes.navigationButtons}
              color="primary"
              variant="contained"
              onClick={() => showResults()}
            >
              Mostrar respuestas
            </Button>
          )}
        </Grid>
      </Grid>
      <Container component="main" className={classes.container}>
        {loading ? (
          <>Obteniendo información ...</>
        ) : (
          <>
            <Grid item xs={12}>
              <Typography variant="h3" style={{ marginBottom: "5%" }}>
                {questionary.name}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5">
                Cantidad de respuestas {questionary.quantity_respones}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" style={{ marginBottom: "5%" }}>
                Cantidad de respuestas correctas{" "}
                {calculateHowManyCorrectAnswersHasQuestionary()}
              </Typography>
            </Grid>
            <Grid
              container
              alignContent="center"
              alignItems="stretch"
              spacing={10}
            >
              {questionary.questions.map((question, questionId) => {
                const data = question.options.map((option, idx) => {
                  console.log("option", option);
                  return {
                    name: abecedario[idx],
                    cantidad: qtyByOptionId[option.id],
                    isCorrect: option.correct,
                  };
                });

                return (
                  <Grid item xs={6} key={questionId}>
                    <b>{question.text}</b>
                    <Typography variant="h6" align="center">
                      Cantidad de respuestas correctas{" "}
                      {calculateHowManyCorrectResponseHasQuestion(questionId)}
                    </Typography>
                    <BarChart
                      width={600}
                      height={300}
                      data={data}
                      margin={{ top: 30, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="cantidad" fill="#8884d8">
                        {data.map((entry, index) => {
                          return (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.isCorrect ? "#808000" : "#FF0000"}
                            />
                          );
                        })}
                      </Bar>
                    </BarChart>
                    <List>
                      {question.options.map((option, idx) => {
                        const message = option.correct
                          ? "Correcto"
                          : "Incorrecto";
                        return (
                          <ListItem key={idx}>
                            <ListItemText
                              primary={
                                <Typography variant="body2">
                                  {abecedario[idx] + " - " + option.text}{" "}
                                  <b>{message}</b>
                                </Typography>
                              }
                            />
                          </ListItem>
                        );
                      })}
                    </List>
                  </Grid>
                );
              })}
            </Grid>
          </>
        )}
      </Container>
    </div>
  );
}

export default withRouter((props) => (
  <SnackbarProvider maxSnack={3}>
    <QuestionnaireStatistics {...props} />
  </SnackbarProvider>
));
