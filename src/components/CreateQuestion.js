import React from 'react';
import { makeStyles, withStyles, lighten } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import CreateIcon from '@material-ui/icons/Create';
import TextField from '@material-ui/core/TextField';
import ChecbokList from "./ChecbokList"
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    rightIcon: {
        marginRight: theme.spacing(1),
    },
    progressPaper: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1)
    }
}));

const MAX_RESPONSE = 5
const NEW_RESPONSE_TEXT = "Nueva pregunta..."


const BorderLinearProgress = withStyles({
    root: {
        height: 10,
        backgroundColor: lighten('#2196f3', 0.5),
    },
    bar: {
        borderRadius: 20,
        backgroundColor: '#2196f3',
    },
})(LinearProgress);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateQuestion(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const [values, setValues] = React.useState({
        progressMessage: 'Escribe la pregunta',
        progress: 0,
        question: '',
        responses: [
            {
                text: NEW_RESPONSE_TEXT,
                isCorrect: false
            }],
        responsesCreated: false,
        aResponseWasMarkedAsCorrect: false
    })

    const handleResponse = idx => event => {
        const oldResponses = values.responses
        oldResponses[idx].text = event.target.value === NEW_RESPONSE_TEXT ? "" : event.target.value
        if (theLastIsNotEmpty(oldResponses) && oldResponses.length < MAX_RESPONSE) {
            oldResponses.push({
                text: NEW_RESPONSE_TEXT,
                isCorrect: false
            })
        }
        setValues({ ...values, responses: oldResponses })
        if (!values.responsesCreated && !values.aResponseWasMarkedAsCorrect && exitTwoCompleteOptions()) {
            setValues({ ...values, responsesCreated: true, progress: 75, progressMessage: 'Indique todas las respuestas correctas' })
        }
    }

    const theLastIsNotEmpty = (responses) => {
        const size = responses.length
        const lastElement = responses[size - 1]
        return lastElement.text !== null && lastElement.text !== "Nueva pregunta..." && lastElement.text !== ""
    }

    const markResponse = (idx, value) => {
        console.log('markResponse', values.responses)
        const oldResponses = values.responses
        oldResponses[idx].isCorrect = value
        setValues({ ...values, responses: oldResponses })
        if (!values.aResponseWasMarkedAsCorrect) {
            setValues({ ...values, aResponseWasMarkedAsCorrect: true, progress: 100, progressMessage: 'Listo' })
        }
    }

    const exitTwoCompleteOptions = () => {
        return values.responses.filter((response) => (
            response.text !== NEW_RESPONSE_TEXT && response.text !== ""
        )).length >= 2
    }


    const deleteResponse = idx => {
        if (idx !== 0 && values.responses.length !== 1) {
            const oldResponses = values.responses
            oldResponses.splice(idx, 1)
            setValues({ responses: oldResponses })
        }
    }

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });

        if (prop === "question") {
            setValues({ ...values, progress: 25, progressMessage: 'Escriba todas las respuestas posibles' })
        }
    };

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                <CreateIcon className={classes.rightIcon} />
                Nueva Pregunta
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Nueva Pregunta
                        </Typography>
                        <Button color="inherit" onClick={handleClose}>
                            guardar
                        </Button>
                    </Toolbar>
                </AppBar>
                <Container>
                    <Paper className={classes.progressPaper}>
                        <Typography variant="h6" component="h2">
                            Progreso : {values.progressMessage}
                        </Typography>
                        <BorderLinearProgress
                            className={classes.margin}
                            variant="determinate"
                            color="secondary"
                            value={values.progress}
                        />
                    </Paper>
                    <TextField
                        id="outlined-full-width"
                        label="Pregunta"
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
                        onChange={handleChange('question')}
                    />
                    <ChecbokList
                        handleChange={handleChange}
                        responses={values.responses}
                        handleResponse={handleResponse}
                        markResponse={markResponse}
                        deleteResponse={deleteResponse}
                        aResponseWasMarkedAsCorrect={values.aResponseWasMarkedAsCorrect}
                    />
                </Container>

            </Dialog>
        </div>
    );
}