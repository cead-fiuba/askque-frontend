import React, { useState, useEffect } from "react";
import AppBar from "./AppBar";
import { makeStyles } from "@material-ui/core/styles";
import {
  getAskquesOfTeacher,
  deleteQuestionaryByHash,
} from "../service/TeacherService";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import CreateIcon from "@material-ui/icons/Add";
import { MySnackbarContentWrapper } from "./common/MySnackbarContentWrapper";
import AlertDialog from "./common/AlertDialog";
import Typography from "@material-ui/core/Typography";
import { useSnackbar, SnackbarProvider } from "notistack";
import { deleteQuestionaryResponses } from "../service/ResponseService";
import { makeCopyOfQuestionaryWith } from "../service/TeacherService";
import QuestionaryCard from "./common/QuestionaryCard";
import MakeCopyAlertDialog from "./MakeCopyAlertDialog";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "8%",
  },
  createAskque: {
    marginTop: theme.spacing(2),
  },
  gridList: {
    width: 500,
    height: 450,
  },
}));

export function MyAskques2(props) {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const [values, setState] = useState({
    questionaries: [],
    errorHappen: false,
    questionaryHash: null,
    questionarySelected: null,
  });

  const [snackBarConfig, setSnackBarConfig] = useState({});
  const [loading, setLoading] = useState(true);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [questionaryToDelete, setQuestionaryToDelete] = useState("");
  const [showLoadingAlertDialog, setShowLoadingAlertDialog] = useState(false);
  const [showMakeCopyAlert, setShowMakeCopyAlert] = useState(false);
  const [questionaryToDoAction, setQuestionaryToDoAction] = useState();
  const [loadingAlertMakeCopy, setLoadingAlertMakeCopy] = useState(false);

  function redirectTo(newPath) {
    history.push(newPath);
  }

  useEffect(() => {
    getAskquesOfTeacher()
      .then((res) => {
        setState({ ...values, questionaries: res.data.questionaries });
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setState({ ...values, errorHappen: true });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snackBarConfig]);

  const deleteQuestionary = (hash) => {
    console.log("deleteQuestionary", showLoadingAlertDialog);
    setShowAlertDialog(false);
    setShowLoadingAlertDialog(true);
    let variant = "success";
    deleteQuestionaryByHash(hash)
      .then((value) => {
        enqueueSnackbar(`El cuestionario ${hash} fue eliminado`, { variant });
        setLoading(true);
        getAskquesOfTeacher().then((res) => {
          setState({ ...values, questionaries: res.data.questionaries });
          setLoading(false);
        });
        setShowLoadingAlertDialog(false);
      })
      .catch((reason) => {
        variant = "error";
        enqueueSnackbar(`No se pudo eliminar el cuestionario ${hash}`, {
          variant,
        });
        setShowLoadingAlertDialog(false);
      });
    deleteQuestionaryResponses(hash)
      .then((value) => {
        enqueueSnackbar(
          `Se eliminaron las respuestas del cuestionario ${hash}`,
          { variant }
        );
        setShowLoadingAlertDialog(false);
      })
      .catch((reason) => {
        variant = "error";
        enqueueSnackbar(
          `No se pudo eliminar las respuestas del cuestionario ${hash}`,
          { variant }
        );
        setShowLoadingAlertDialog(false);
      });
  };

  const handleMakeCopyOfQuestionary = (hash) => {
    setQuestionaryToDoAction(hash);
    setShowMakeCopyAlert(true);
  };

  const handleDeleteQuestionary = (hash) => {
    setQuestionaryToDelete(hash);
    setShowAlertDialog(true);
  };

  const makeCopyOfQuestionary = (withMe, email) => {
    setLoadingAlertMakeCopy(true);
    makeCopyOfQuestionaryWith(withMe, email, questionaryToDoAction)
      .then((res) => {
        setShowMakeCopyAlert(false);
        enqueueSnackbar(
          `Se creó la copia del questionario ${questionaryToDoAction}`,
          { variant: "success" }
        );
      })
      .catch((reason) => {
        enqueueSnackbar(`No se puedo generar la copia, intente mas tarde`, {
          variant: "error",
        });
      });
  };

  const getLinkOfQuestionary = (hash) => {
    console.log(window.location.host + "/ask-questionary/");
    const text = window.location.protocol + "//" + window.location.host + "/ask-questionary/" + hash;
    navigator.clipboard.writeText(text);
    let variant = "success";
    enqueueSnackbar(`El link fue copiado`, { variant });
  };

  return (
    <div>
      <AppBar position="static" />
      <Container maxWidth="md" component="main" className={classes.container}>
        {loading ? (
          "Obteniendo información"
        ) : (
          <>
            {values.questionaries.length === 0 ? (
              "Ups! No tenes ningún cuestionario creado.\n" +
              "No te preocupes, es muy fácil!"
            ) : (
              <Grid container spacing={10}>
                {values.questionaries.map((questionary, idx) => (
                  <Grid item xs key={idx}>
                    <QuestionaryCard
                      key={idx}
                      questionary={questionary}
                      deleteQuestionary={() => {
                        handleDeleteQuestionary(questionary.hash);
                      }}
                      editQuestionary={() =>
                        redirectTo(`edit-questionary/${questionary.hash}`)
                      }
                      showQuestionaryResults={() => {
                        redirectTo(`ask-results/${questionary.hash}`);
                      }}
                      makeCopy={() => {
                        handleMakeCopyOfQuestionary(questionary.hash);
                      }}
                      getLinkOfQuestionary={() => {
                        getLinkOfQuestionary(questionary.hash);
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
            {snackBarConfig.show && (
              <MySnackbarContentWrapper
                variant={snackBarConfig.state}
                message={snackBarConfig.message}
                open={snackBarConfig.show}
                onClose={() => {
                  setSnackBarConfig({ show: false });
                }}
              />
            )}

            <Fab
              color="primary"
              style={{ margin: "10%" }}
              onClick={() => {
                redirectTo("/create-questionary");
              }}
            >
              <CreateIcon />
            </Fab>
            <AlertDialog
              open={showAlertDialog}
              handleClose={() => {
                setShowAlertDialog(false);
              }}
              title={"Eliminar cuestionario"}
              content={
                <Typography variant="body1">
                  {"¿Está seguro que desea eliminar el cuestionario?"}
                </Typography>
              }
              buttonTextOk={"Sí, Eliminar"}
              buttonTextCancel={"Cancelar"}
              handleOk={() => {
                deleteQuestionary(questionaryToDelete);
              }}
              loading={showLoadingAlertDialog}
            />
            <MakeCopyAlertDialog
              open={showMakeCopyAlert}
              handleClose={() => {
                setShowMakeCopyAlert(false);
              }}
              handleOk={makeCopyOfQuestionary}
              loading={loadingAlertMakeCopy}
            />
          </>
        )}
      </Container>
    </div>
  );
}

export default function MyAskques(props) {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyAskques2 {...props} />
    </SnackbarProvider>
  );
}
