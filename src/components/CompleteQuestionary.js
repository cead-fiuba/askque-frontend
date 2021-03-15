import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SendIcon from "@material-ui/icons/Send";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { saveResponse } from "../service/StudentService";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckIcon from "@material-ui/icons/Check";
import Dialog from "@material-ui/core/Dialog";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { updateQuantityResponses } from "../service/QuestionaryService";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
    height: "100%",
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: "auto",
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -24,
    left: 0,
    right: 0,
    margin: "0 auto",
  },
  fabProgress: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
    color: "#47bef5",
  },
  root: {
    padding: theme.spacing(3),
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function CompleteQuestionary(props) {
  const classes = useStyles();

  const [checked, setChecked] = useState([]);
  const [questionIdsMarked, setQuestionIdsMarked] = useState(new Set());
  const [showSendButton, setShowSendButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sucess, setSuccess] = useState(false);
  const [showMessageSuccess, setShowMessageSuccess] = useState(false);

  function eqSet(as, bs) {
    if (as.size !== bs.size) return false;
    for (var a of as) if (!bs.has(a)) return false;
    return true;
  }

  const handleToggle = (value, questionId) => () => {
    const currentIndex = checked.indexOf(value.id);
    const newChecked = [...checked];
    const questionIdsMarkedNew = new Set(questionIdsMarked);
    const allQuestionsSet = new Set(
      props.questionary.questions.map((question) => question.id)
    );

    if (currentIndex === -1) {
      questionIdsMarkedNew.add(questionId);
      newChecked.push(value.id);
    } else {
      questionIdsMarkedNew.delete(questionId);
      newChecked.splice(currentIndex, 1);
    }
    setShowSendButton(eqSet(allQuestionsSet, questionIdsMarkedNew));
    setQuestionIdsMarked(questionIdsMarkedNew);
    setChecked(newChecked);
  };

  const createQuestionIdByOptionId = () => {
    const questionIdByOptionId = {};
    props.questionary.questions.forEach((question) => {
      question.options.forEach((option) => {
        questionIdByOptionId[option.id] = question.id;
      });
    });
    return questionIdByOptionId;
  };

  const sendResponse = () => {
    console.log("click");
    const questionIdByOptionId = createQuestionIdByOptionId();
    const response = {
      questionaryHash: props.questionary.hash,
      responses: checked.map((optionId) => ({
        optionId: optionId,
        questionId: questionIdByOptionId[optionId],
      })),
    };
    setLoading(true);
    const saveResponsePromise = saveResponse(response);
    const updateQuantityResponsesPromise = updateQuantityResponses(
      props.questionary.hash
    );
    Promise.all([saveResponsePromise, updateQuantityResponsesPromise]).then(
      ([saveResponseResult, updateQuatity]) => {
        setSuccess(true);
        setLoading(false);
        setTimeout(() => {
          setShowMessageSuccess(true);
        }, 1000);
      }
    );
  };

  const createOptions = (options, questionId) => {
    return options.map((option) => (
      <ListItem
        key={option.id}
        role={undefined}
        dense
        button
        onClick={handleToggle(option, questionId)}
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked.indexOf(option.id) !== -1}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": option.id }}
          />
        </ListItemIcon>
        <ListItemText id={option.id} primary={option.text} />
      </ListItem>
    ));
  };

  const handleClose = () => {
    setShowMessageSuccess(false);
  };
  return (
    <React.Fragment>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={showMessageSuccess}
        fullWidth
        maxWidth={"xs"}
      >
        <DialogTitle id="customized-dialog-title">
          Encuesta {props.questionary.hash}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Su respuesta fue enviada, gracias por participar
          </Typography>
          <Typography gutterBottom>
            Para ver todas sus <Link href={"/my-answers"}>respuestas</Link>
          </Typography>
        </DialogContent>
      </Dialog>
      <Grid container>
        <Paper square className={classes.paper}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="flex-start"
            className={classes.root}
          >
            {props.questionary.questions.map(
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
                  <List className={classes.list}>
                    {createOptions(options, id)}
                  </List>
                </Grid>
              )
            )}
          </Grid>
        </Paper>
        <AppBar position="fixed" color="primary" className={classes.appBar}>
          <Toolbar>
            {showSendButton ? (
              <>
                <Fab
                  color="primary"
                  aria-label="add"
                  className={classes.fabButton}
                  onClick={sendResponse}
                >
                  {sucess ? <CheckIcon /> : <SendIcon />}
                </Fab>
                <>
                  {loading && (
                    <CircularProgress
                      size={68}
                      className={classes.fabProgress}
                    />
                  )}
                </>
              </>
            ) : (
              <b>Asegurate de marcar alguna opcion cada pregunta</b>
            )}
          </Toolbar>
        </AppBar>
      </Grid>
    </React.Fragment>
  );
}
