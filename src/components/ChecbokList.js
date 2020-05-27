import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import OkIcon from "@material-ui/icons/CheckTwoTone";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import NotOkicon from "@material-ui/icons/ClearTwoTone";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  responseText: {
    marginRight: theme.spacing(1),
  },
}));

export default function CheckboxList(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <>
      <List className={classes.root}>
        {props.responses.map((response, idx) => {
          const labelId = `checkbox-list-label-${idx}`;

          return (
            <ListItem
              key={idx}
              role={undefined}
              dense
              button
              onClick={handleToggle(idx)}
            >
              <ListItemText
                id={labelId}
                primary={
                  <TextField
                    fullWidth
                    onChange={props.handleResponse(idx)}
                    onClick={props.handleResponse(idx)}
                    value={response.text}
                    variant="outlined"
                    margin="dense"
                    error={
                      !response.correct && props.aResponseWasMarkedAsCorrect
                    }
                  />
                }
                className={classes.responseText}
              />
              <ButtonGroup
                variant="contained"
                aria-label="large contained secondary button group"
                size="small"
              >
                <Button onClick={() => props.deleteResponse(idx)}>
                  <DeleteIcon />
                </Button>
                <Button
                  onClick={() => props.markResponse(idx, true)}
                  disabled={!props.existTwoCompleteOptions || response.isNew}
                >
                  <OkIcon />
                </Button>
                <Button
                  onClick={() => props.markResponse(idx, false)}
                  disabled={!props.existTwoCompleteOptions || response.isNew}
                >
                  <NotOkicon />
                </Button>
              </ButtonGroup>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
