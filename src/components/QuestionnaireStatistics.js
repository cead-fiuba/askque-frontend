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
} from "recharts";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { withRouter } from "react-router-dom";

const abecedario = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

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
  const [results, setResults] = useState();

  useEffect(() => {
    const informationPromise = getInformationOfQuestionary(
      props.match.params.hash
    );
    const resultPromise = getResultOfQuestionary(props.match.params.hash);

    Promise.all([informationPromise, resultPromise]).then(
      ([informationResponse, resultResponse]) => {
        const information = informationResponse.data;
        const results = resultResponse.data.answers;
        setQuestionary(information);
        setResults(results);
        setLoading(false);
      }
    );

    const interval = setInterval(() => {
      const resultPromise = getResultOfQuestionary(props.match.params.hash);
      resultPromise.then((resultResponse) => {
        const result = resultResponse.data.answers;
        setResults(result);
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
          <Button
            className={classes.navigationButtons}
            color="primary"
            variant="contained"
            onClick={() => props.history.push("/create-questionary")}
          >
            Crear encuesta
            <AddIcon className={classes.rightIcon} />
          </Button>
        </Grid>
      </Grid>
      <Container maxWidth="md" component="main" className={classes.container}>
        {loading ? (
          <>Obteniendo información</>
        ) : (
          <>
            <Typography variant="h3" style={{ marginBottom: "5%" }}>
              {questionary.name}
            </Typography>
            <Typography variant="h5" style={{ marginBottom: "5%" }}>
              Cantidad de respuestas {questionary.quantity_respones}
            </Typography>

            <>
              {questionary.questions.map((question, questionId) => {
                const data = question.options.map((option, idx) => {
                  return {
                    name: abecedario[idx],
                    cantidad: results[option.id],
                  };
                });

                return (
                  <div key={questionId}>
                    <b style={{ margin: "5%" }}>{question.text}</b>
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
                      <Bar dataKey="cantidad" fill="#8884d8" />
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
                  </div>
                );
              })}
            </>
          </>
        )}
      </Container>
    </div>
  );
}

export default withRouter((props) => <QuestionnaireStatistics {...props} />);
