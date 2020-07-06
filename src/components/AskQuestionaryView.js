import React, { Component } from "react";
import "../style/style.scss";
import AppBar from "./AppBar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AskqueResumen from "./AskqueResume";
import { getInformationOfQuestionaryWithCache } from "../service/QuestionaryService";
import Button from "@material-ui/core/Button";
import CompleteQuestionary from "./CompleteQuestionary";
import Container from '@material-ui/core/Container';
import ReactCodeInput from 'react-code-input';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  codeInput:{
    fontSize: '15px !important' 
  }
}));



const AskQuestionaryView = () => {
  const classes = useStyles();


  const [state,setState] = React.useState({
    questionaryHash: "",
    showLoading: false,
    showInformation: true,
    showResume: false,
    questionaryName: null,
    questionaryModulo: null,
    startCompleteQuestionary: false,
    questionary: null,
  })

  const handleChange = (code) => {
    const hash = code.toUpperCase();
    console.log('hash',hash)
    const isComplete = hash.length === 3;
    setState({ ...state,questionaryHash: hash });
    if (isComplete) {
      getInformationOfQuestionaryWithCache(hash).then((response) => {
        setState({
          ...state,
          showResume: true,
          questionaryName: response.data.name,
          questionaryModulo: response.data.module,
          questionaryTime: response.data.time,
          quantityQuestions: response.data.questions.length,
          questionary: response.data,
        });
      });
    }
  };

  const startCompleteQuestionary = () => {
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
         <Container maxWidth="md">
         <Grid container
         justify="center"
         alignItems="center"
         >
            <Grid item xs={12}>
             <Typography
              variant="h4"
              align="center"
              color="textPrimary"
              gutterBottom
              style={{ marginTop: "3em" }}
              >
              Ingrese la clave 
              </Typography>
            </Grid>
            <Grid item>
            <ReactCodeInput 
            type='text' 
            fields={3}
            onChange={handleChange}
            style={{marginBottom:"30%"}}
            inputStyle={{
  MozAppearance: "textfield",
  borderRadius: "6px",
  border: "1px solid",
  boxShadow:"0px 0px 10px 0px rgba(0,0,0,.10)",
  margin: "4px",
  paddingLeft: "8px",
  width: "52px",
  height: "64px",
  fontSize: "46px",
  boxSizing: "border-box",
  color: "black",
  backgroundColor: "white",
  borderColor: "lightgrey",
  textTransform:"uppercase"
            }}
            />
            </Grid>
               {state.showResume &&
               <>
               <Grid item xs={10}>
               <AskqueResumen
                  name={state.questionaryName}
                  module={state.questionaryModulo}
                  code={state.questionaryHash}
                  time={state.questionaryTime}
                  date={state.questionary.date}
                  quantityQuestions={state.quantityQuestions}
                />
               </Grid>
                
              <Grid item xs={8}>
              <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={startCompleteQuestionary}
                   >
                  Estoy listo
                  </Button>
              </Grid>
                
              </>
                  }
              {state.startCompleteQuestionary && <CompleteQuestionary
                hash={state.questionaryHash}
                questionary={state.questionary}
              />
              }
          </Grid>







      </Container>
      </>
    );
}


export default AskQuestionaryView;