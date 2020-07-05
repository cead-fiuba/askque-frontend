import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    marginTop: "2%",
  },
}));

export default function OptionList(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  return (
    <>
      <Grid container className={classes.root}>
        {props.responses.map((response, idx) => {
          return (
            <Grid container justify="flex-end">
              <Grid item key={idx} sm={12}>
                <TextField
                  fullWidth
                  onChange={props.handleResponse(idx)}
                  onClick={props.handleResponse(idx)}
                  value={response.text}
                  variant="outlined"
                  margin="dense"
                  error={!response.correct}
                />
              </Grid>
              <Grid sm={1}>
                <ButtonGroup variant="text">
                  <Button size="small">
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
