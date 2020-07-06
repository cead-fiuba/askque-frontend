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

  const [currentOption, setCurrentOption] = useState({
    text: "",
    isCorrect: false,
    isNotCorrect: false,
    id: null,
  });

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

  const addOption = (option, idx) => {
    console.log("add option idx", idx);
    const currentOptions = [...values.options];
    if (idx !== null && idx !== undefined) {
      currentOptions[idx] = option;
    } else {
      currentOptions.push(option);
    }
    setCurrentOption({
      text: "",
      isCorrect: false,
      isNotCorrect: false,
      id: null,
    });
    setValues({ ...values, options: currentOptions });
  };

  const deleteOption = (idx) => {
    console.log("delete idx", idx);
    const currentOptions = [...values.options];
    currentOptions.splice(idx, 1);
    console.log("currentOptions", currentOptions);
    setValues({ ...values, options: currentOptions });
  };

  const editOption = (idx) => {
    const optionToEdit = values.options[idx];
    setCurrentOption({
      text: optionToEdit.text,
      isCorrect: optionToEdit.correct,
      isNotCorrect: !optionToEdit.correct,
      id: idx,
    });
    setOpenAddOptionDialog(true);
  };

  const saveImage = (formDataOfImage) => {
    console.log("Saving image...", formDataOfImage);
    setFileImage(formDataOfImage);
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
    props.handleClose();
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <Dialog fullScreen open={props.open} onClose={props.handleClose}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
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
            disabled={values.question === "" && values.options.length === 0}
          >
            Guardar
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
          responses={values.options}
          deleteOption={deleteOption}
          editOption={editOption}
        />

        <AddOptionDialog
          open={openAddOptionDialog}
          handleClose={handleDialogClose}
          addOption={addOption}
          defaultValues={currentOption}
        />
      </Container>
    </Dialog>
  );
}
