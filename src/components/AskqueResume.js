import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import ShareIcon from '@material-ui/icons/Share'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(5),
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1)
    },
    header: {
        textAlign: 'center'
    }
}));

export default function AskqueResumen(props) {
    const classes = useStyles();
    return <Grid item xs={12}>
        <Paper className={classes.paper}>
            <Grid container>
                <Grid item xs={10}>
                    <div className={classes.header}>
                        <Typography gutterBottom variant="h6">
                            {props.name}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Código {props.code} - MultipleChoice
                </Typography>
                    </div>
                    <Typography variant="body1" color="textSecondary">
                        Módulo {props.module}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        {props.creationDate}
                    </Typography>


                </Grid>
                {props.teacher ?
                    <Grid item xs={2} container>
                        <Grid item xs={12}>
                            <IconButton aria-label="delete">
                                <ShareIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={12}>
                            <IconButton aria-label="delete">
                                <EditIcon />
                            </IconButton>
                        </Grid>
                    </Grid> :
                    null
                }

            </Grid>
        </Paper>
    </Grid>
}