import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';


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
    }, item: {
        height: '90%'
    },
    rightIcon: {
        marginLeft: theme.spacing(1)
    }
}));


/***
 * 
 * PROPS
 * 
 * date: fecha de creación de la encuesta
 * 
 * 
 * 
 */

export default function AskqueResumen(props) {

    function formatDate() {
        const date = new Date(props.date)
        var monthNames = [
            "Enero", "Febrero", "Marzo",
            "Abril", "Mayo", "Junio", "Julio",
            "Agosto", "Septiembre", "Octubre",
            "Noviembre", "Diciembre"
        ];

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }


    const classes = useStyles();
    return <Grid item xs className={classes.item}>
        <Paper className={classes.paper}
            onClick={props.onClick}
        >
            <Grid container>
                <Grid item xs={10}>
                    <div className={classes.header}>
                        <Typography gutterBottom variant="h6">
                            <b>{props.name}</b>
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Código {props.code} - MultipleChoice
                </Typography>
                    </div>
                    <Typography variant="body1" color="textSecondary">
                        <b>Módulo</b> {props.module}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        {formatDate()}
                    </Typography>


                </Grid>
                <Grid item xs={2} container>
                    {props.showActions && <><Grid item >
                        <IconButton aria-label="delete" color="primary">
                            <ShareIcon />
                        </IconButton>
                    </Grid>
                        <Grid item >
                            <IconButton aria-label="delete" color="primary" onClick={() => props.editQuestionary()}>
                                <EditIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Eliminar" placement="right">
                                <IconButton aria-label="delete" onClick={() => props.deleteQuestionary()} color="primary">
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Ver resultados" placement="right">
                                <IconButton aria-label="delete" onClick={props.showQuestionaryResults} color="primary">
                                    <VisibilityIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid></>}

                </Grid>
            </Grid>
        </Paper>
    </Grid>
}