import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import DoneOutlineRoundedIcon from "@material-ui/icons/DoneOutlineRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    marginTop: "2%",
  },
  helpIconOk: {
    color: "green",
  },
  helpIconNotOk: {
    color: "red",
  },
  buttonGroup: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
}));

export default function OptionList(props) {
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.root}>
        {props.responses.map((response, idx) => {
          return (
            <Grid container justify="flex-end" key={idx}>
              <Grid item sm={11}>
                <TextField
                  fullWidth
                  value={response.text}
                  variant="outlined"
                  margin="dense"
                  className={
                    response.correct
                      ? classes.correctOption
                      : classes.incorrectOption
                  }
                  InputProps={{
                    endAdornment: (
                      <>
                        {response.correct ? (
                          <DoneOutlineRoundedIcon
                            fontSize="large"
                            className={classes.helpIconOk}
                          />
                        ) : (
                          <CloseRoundedIcon
                            fontSize="large"
                            className={classes.helpIconNotOk}
                          />
                        )}
                      </>
                    ),
                  }}
                />
              </Grid>
              <Grid item sm={1}>
                <ButtonGroup variant="text" className={classes.buttonGroup}>
                  <Button
                    size="small"
                    onClick={() => {
                      props.editOption(idx);
                    }}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    size="small"
                    onClick={() => {
                      props.deleteOption(idx);
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
