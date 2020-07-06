import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const AddOptionDialog = (props) => {
  const [text, setText] = useState("");

  const [isCorrect, setIsCorrect] = useState(false);
  const [isNotCorrect, setIsNotCorrect] = useState(false);

  useEffect(() => {
    setText(props.defaultValues.text);
    setIsCorrect(props.defaultValues.isCorrect);
    setIsNotCorrect(props.defaultValues.isNotCorrect);
  }, [props]);

  const save = () => {
    props.handleClose();
    props.addOption({ text: text, correct: isCorrect }, props.defaultValues.id);
  };
  const cancel = () => {
    props.handleClose();
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Agregar una nueva opción"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Inserte el texto de la nueva opción
          <TextField
            id="outlined-full-width"
            label="Texto"
            placeholder="Escriba el texto..."
            multiline
            rows={2}
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            onChange={(event) => {
              setText(event.target.value);
            }}
            value={text}
          />
          ¿La opción es correcta?
          <FormControlLabel
            control={
              <Checkbox
                checked={isCorrect}
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
                onChange={() => {
                  setIsCorrect(true);
                  setIsNotCorrect(false);
                }}
              />
            }
            label="Sí"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={isNotCorrect}
                onChange={() => {
                  setIsNotCorrect(true);
                  setIsCorrect(false);
                }}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            }
            label="No"
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancel} color="primary">
          Cancelar
        </Button>
        <Button onClick={save} color="primary" autoFocus variant="contained">
          {props.defaultValues.id !== null ? "Sí,guardar" : "Sí,agregar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOptionDialog;
