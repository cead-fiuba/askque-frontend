import React, { useState } from "react";
import AlertDialog from "./common/AlertDialog";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { findTeacherByEmail } from "../service/TeacherService";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
  },
}));

const MakeCopyAlertContent = (props) => {
  const classes = useStyles();
  const [makeCopyForMe, setMakeCopyForMe] = useState(true);
  const [otherUserEmailForError, setOtherUserEmailForError] = useState(false);
  const [formEmailHelperText, setFormEmailHelperText] = useState();

  const handleChangeEmailInput = (event) => {
    const email = event.target.value;
    findTeacherByEmail(email)
      .then((res) => {
        console.log("email ok");
        props.sharedWith(email);
        setOtherUserEmailForError(false);
        props.sharedWith(email);
        setFormEmailHelperText("Usuario encontrado!");
      })
      .catch((reason) => {
        console.log("bad email");
        setOtherUserEmailForError(true);
        setFormEmailHelperText("No se encontró ningún usuario!  ");
      });
  };

  const handleChange = (event) => {
    const value = event.target.value;
    console.log("value", value);
    if (value === "0") {
      console.log("for me");
      setMakeCopyForMe(true);
      props.setMakeCopyForMe(true);
    } else {
      console.log("for other");
      setMakeCopyForMe(false);
      props.setMakeCopyForMe(false);
    }
  };

  return (
    <>
      ¿Para quién desea realizar la copia?
      <form className={classes.container}>
        <TextField
          id="outlined-select-currency-native"
          select
          className={classes.textField}
          onChange={handleChange}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          variant="outlined"
          margin="dense"
          fullWidth
        >
          <option key={0} value={0}>
            Para mi
          </option>
          <option key={1} value={2}>
            Para otro usuario
          </option>
        </TextField>

        {!makeCopyForMe && (
          <>
            <Typography variant="body1" gutterBottom>
              Ingrese el mail del usuario
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              type="email"
              variant="outlined"
              fullWidth
              error={otherUserEmailForError}
              onChange={handleChangeEmailInput}
              helperText={formEmailHelperText}
            />
          </>
        )}
      </form>
    </>
  );
};

const MakeCopyAlertDialog = (props) => {
  const [sharedWith, setSharedWith] = useState();
  const [makeCopyForMe, setMakeCopyForMe] = useState(true);

  const makeCopy = () => {
    console.log("makeCopy", makeCopyForMe);
    props.handleOk(makeCopyForMe, sharedWith);
  };

  return (
    <AlertDialog
      open={props.open}
      handleClose={props.handleClose}
      title="Hacer copia del cuestionario"
      buttonTextOk={<b>Listo</b>}
      buttonTextCancel={<b>Cancelar</b>}
      handleOk={makeCopy}
      content={
        <MakeCopyAlertContent
          setMakeCopyForMe={setMakeCopyForMe}
          sharedWith={setSharedWith}
        />
      }
      scroll={"body"}
      loading={props.loading}
    />
  );
};

export default MakeCopyAlertDialog;
