import React, { useEffect, useState } from "react";
import { makeStyles, withStyles, lighten } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import OptionList from "./OptionList";
import Container from "@material-ui/core/Container";
import ImageUpload from "../components/ImageUpload";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import AddOptionDialog from "./AddOptionDialog";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  progressPaper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
  },
}));

const MAX_RESPONSE = 5;
const NEW_RESPONSE_TEXT = "Escriba aquí la opción posible";

/***
 *
 * props = {
 *   asEdit:boolean
 * }
 *
 * @param asEdit: indica si el componente se esta usando en modo edición o no
 * @param question: si asEdit === true entonces como prop deberia venir el question
 *
 */
export default function CreateQuestion(props) {
  const classes = useStyles();

  const [withImage, setWithImage] = useState(false);
  const [fileImage, setFileImage] = useState(null);
  const [openAddOptionDialog, setOpenAddOptionDialog] = React.useState(false);

  useEffect(() => {
    setValues({
      question: props.question.text,
      options: props.asEdit ? props.question.options : [],
      responsesCreated: props.question.text !== "",
    });
    setWithImage(props.question.has_image === true);
  }, [
    props.asEdit,
    props.question.options,
    props.question.text,
    props.question.has_image,
  ]);

  const [values, setValues] = React.useState({
    question: props.question.text,
    options: props.asEdit ? props.question.options : [],
  });

  const handleDialogClose = () => {
    setOpenAddOptionDialog(false);
  };

  const addOption = (option) => {
    const currentOptions = [...values.options];
    currentOptions.push(option);
    setValues({ ...values, options: currentOptions });
  };

  const deleteOption = (idx) => {
    const currentOptions = [...values.options];
    currentOptions.splice(idx);
    setValues({ ...values, options: currentOptions });
  };

  const saveImage = (formDataOfImage) => {
    console.log("Saving image...", formDataOfImage);
    setFileImage(formDataOfImage);
  };

  const handleResponse = (idx) => (event) => {
    const oldResponses = values.options;
    oldResponses[idx].text =
      event.target.value === NEW_RESPONSE_TEXT ? "" : event.target.value;
    oldResponses[idx].isNew = false;
    if (theLastIsNotEmpty(oldResponses) && oldResponses.length < MAX_RESPONSE) {
      oldResponses.push({
        text: NEW_RESPONSE_TEXT,
        correct: false,
        isNew: true,
      });
    }
    setValues({ ...values, options: oldResponses });
    if (
      !values.responsesCreated &&
      !values.aResponseWasMarkedAsCorrect &&
      exitTwoCompleteOptions()
    ) {
      setValues({
        ...values,
        options: oldResponses,
        responsesCreated: true,
        progress: 75,
        progressMessage: "Indique todas las respuestas correctas",
      });
    }
  };

  const theLastIsNotEmpty = (responses) => {
    const size = responses.length;
    const lastElement = responses[size - 1];
    return (
      lastElement.text !== null &&
      lastElement.text !== NEW_RESPONSE_TEXT &&
      lastElement.text !== ""
    );
  };

  const exitTwoCompleteOptions = () => {
    return (
      values.options.filter(
        (response) =>
          response.text !== NEW_RESPONSE_TEXT && response.text !== ""
      ).length >= 2
    );
  };

  const deleteResponse = (idx) => {
    if (values.options.length > 1) {
      const oldResponses = values.options;
      oldResponses.splice(idx, 1);
      setValues({ ...values, options: oldResponses });
    }
  };

  function save() {
    const toSave = {
      question: values.question,
      fileImage: fileImage,
      options: values.options,
    };
    if (props.asEdit) {
      toSave.id = props.question.id;
    }
    props.saveQuestion(toSave, props.asEdit);
    cleanForm();
    props.handleClose();
  }

  const cleanForm = () => {
    setValues({
      progressMessage: "Escriba la pregunta",
      progress: 0,
      question: "",
      options: [
        {
          text: NEW_RESPONSE_TEXT,
          correct: false,
          isNew: true,
        },
      ],
      responsesCreated: false,
      aResponseWasMarkedAsCorrect: false,
    });
  };
  const handleChange = (prop) => (event) => {
    if (
      prop === "question" &&
      !values.responsesCreated &&
      !values.aResponseWasMarkedAsCorrect
    ) {
      setValues({
        ...values,
        [prop]: event.target.value,
        progress: 25,
        progressMessage: "Escriba las opciones",
      });
    } else {
      setValues({ ...values, [prop]: event.target.value });
    }
  };

  return (
    <Dialog fullScreen open={props.open} onClose={props.handleClose}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              cleanForm();
              props.handleClose();
            }}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Nueva Pregunta
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={save}
            disabled={
              !(
                (values.responsesCreated &&
                  values.aResponseWasMarkedAsCorrect &&
                  values.question !== "") ||
                props.asEdit
              )
            }
          >
            Crear
          </Button>
        </Toolbar>
      </AppBar>
      <Container className={classes.margin}>
        <FormControlLabel
          control={
            <Switch
              checked={withImage}
              color="primary"
              onChange={() => setWithImage(!withImage)}
              value="checkedA"
            />
          }
          label={"Con imagen"}
        />

        {withImage && (
          <ImageUpload
            saveImage={saveImage}
            imageUrl={props.question.image_url}
          />
        )}

        <TextField
          id="outlined-full-width"
          label="Texto"
          style={{ marginTop: 30 }}
          placeholder="Escriba el texto..."
          multiline
          rows={6}
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          onChange={handleChange("question")}
          value={values.question}
        />
        <Button
          onClick={() => {
            setOpenAddOptionDialog(true);
          }}
          color="primary"
          variant="contained"
        >
          Agregar opción
        </Button>
        <OptionList
          handleChange={handleChange}
          responses={values.options}
          handleResponse={handleResponse}
          deleteOption={deleteOption}
        />

        <AddOptionDialog
          open={openAddOptionDialog}
          handleClose={handleDialogClose}
          addOption={addOption}
        />
      </Container>
    </Dialog>
  );
}
