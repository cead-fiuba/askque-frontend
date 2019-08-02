import React from "react";
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
    rowResponse: {
        marginBottom: theme.spacing(2)
    }
}));

export default function Response() {
    const classes = useStyles();

    return (
        <Grid container spacing={1} className={classes.rowResponse}>
            <Grid item xs={2}>
                <IconButton aria-label="Delete">
                    <DoneIcon fontSize="small" />
                </IconButton>
            </Grid>
            <Grid item xs={8}>
                <TextField
                    id="standard-full-width"
                    style={{ margin: 8 }}
                    placeholder="Escribe la respuesta..."
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            <Grid item xs={2}>
                <IconButton aria-label="Delete">
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Grid>
        </Grid>
    )
}