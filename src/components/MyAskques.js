import React from 'react';
import AppBar from "./AppBar"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AskqueResume from "./AskqueResume"

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    }
}));


export default function MyAskques() {
    const classes = useStyles();
    return <div>
        <AppBar
            position="static"
        />
        <div className={classes.root}>
            <Grid container>
                <AskqueResume
                    code='W58H'
                />
                <AskqueResume
                    code='YJ7I'
                />
            </Grid>
        </div>
    </div>
}
