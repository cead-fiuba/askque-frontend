import React, { useEffect } from 'react';
import { makeStyles, withStyles, lighten } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import ChecbokList from "./ChecbokList"
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import SaveIcon from '@material-ui/icons/Save'
import ImageUpload from '../components/ImageUpload'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
    progressPaper: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1)
    }
}));

const MAX_RESPONSE = 5
const NEW_RESPONSE_TEXT = "Nueva respuesta ..."


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

    const [withImage, setWithImage] = React.useState(false)


    useEffect(() => {
        setValues({
            progressMessage: 'Escribe la pregunta',
            progress: props.question.text !== "" ? 100 : 0,
            question: props.question.text,
            options: props.asEdit ? props.question.options :
                [
                    {
                        text: NEW_RESPONSE_TEXT,
                        correct: false,
                        isNew: true
                    }],
            responsesCreated: props.question.text !== "",
            aResponseWasMarkedAsCorrect: false
        })
    }, [props.asEdit, props.question.options, props.question.text])

    const [values, setValues] = React.useState({
        progressMessage: 'Escribe la pregunta',
        progress: props.question.text !== "" ? 100 : 0,
        question: props.question.text,
        options: props.asEdit ? props.question.options :

            [
                {
                    text: NEW_RESPONSE_TEXT,
                    correct: false,
                    isNew: true
                }],
        responsesCreated: props.question.text !== "",
        aResponseWasMarkedAsCorrect: false
    })

    const handleResponse = idx => event => {
        const oldResponses = values.options
        oldResponses[idx].text = event.target.value === NEW_RESPONSE_TEXT ? "" : event.target.value
        oldResponses[idx].isNew = false
        if (theLastIsNotEmpty(oldResponses) && oldResponses.length < MAX_RESPONSE) {
            oldResponses.push({
                text: NEW_RESPONSE_TEXT,
                correct: false,
                isNew: true
            })
        }
        setValues({ ...values, options: oldResponses })
        if (!values.responsesCreated && !values.aResponseWasMarkedAsCorrect && exitTwoCompleteOptions()) {
            setValues({ ...values, options: oldResponses, responsesCreated: true, progress: 75, progressMessage: 'Indique todas las respuestas correctas' })
        }
    }

    const theLastIsNotEmpty = (responses) => {
        const size = responses.length
        const lastElement = responses[size - 1]
        return lastElement.text !== null && lastElement.text !== NEW_RESPONSE_TEXT && lastElement.text !== ""
    }

    const markResponse = (idx, value) => {
        const oldResponses = values.options.filter((option) => (option.text !== NEW_RESPONSE_TEXT && option.text !== ""))
        oldResponses[idx].correct = value
        if (!values.aResponseWasMarkedAsCorrect) {
            setValues({ ...values, options: oldResponses, aResponseWasMarkedAsCorrect: true, progress: 100, progressMessage: 'Listo' })
        } else {
            setValues({ ...values, options: oldResponses })
        }
    }

    const exitTwoCompleteOptions = () => {
        return values.options.filter((response) => (
            response.text !== NEW_RESPONSE_TEXT && response.text !== ""
        )).length >= 2
    }


    const deleteResponse = idx => {
        if (values.options.length > 1) {
            const oldResponses = values.options
            oldResponses.splice(idx, 1)
            setValues({ ...values, options: oldResponses })
        }
    }


    function save() {
        const toSave = {
            question: values.question,
            options: values.options,
            id: props.asEdit ? props.question.id : null
        }
        props.saveQuestion(toSave, props.asEdit)
        cleanForm()
        props.handleClose()
    }


    const cleanForm = () => {
        setValues({
            progressMessage: 'Escribe la pregunta',
            progress: 0,
            question: '',
            options: [
                {
                    text: NEW_RESPONSE_TEXT,
                    correct: false,
                    isNew: true
                }],
            responsesCreated: false,
            aResponseWasMarkedAsCorrect: false
        })
    }
    const handleChange = prop => event => {
        if (prop === "question" && !values.responsesCreated && !values.aResponseWasMarkedAsCorrect) {
            setValues({ ...values, [prop]: event.target.value, progress: 25, progressMessage: 'Escriba todas las respuestas posibles' })
        } else {
            setValues({ ...values, [prop]: event.target.value });
        }
    };

    return <Dialog fullScreen
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={Transition}
    >
        <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit"
                    onClick={() => {
                        cleanForm()
                        props.handleClose()
                    }}
                    aria-label="Close">
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Nueva Pregunta
                        </Typography>
                <Button
                    variant="outlined"
                    onClick={save}
                    disabled={!(values.responsesCreated && values.aResponseWasMarkedAsCorrect && values.question !== "" || props.asEdit)}
                >
                    guardar
                    <SaveIcon className={classes.rightIcon} />
                </Button>
            </Toolbar>
        </AppBar>
        <Container>
            <Paper className={classes.progressPaper}>
                <Typography variant="h6" component="h2">
                    Progreso : <b>{values.progressMessage}</b>
                </Typography>
                <BorderLinearProgress
                    className={classes.margin}
                    variant="determinate"
                    color="secondary"
                    value={values.progress}
                />
            </Paper>

            <FormControlLabel
                control={
                    <Switch
                        checked={withImage}
                        color="primary"
                        onChange={() => setWithImage(!withImage)} value="checkedA" />
                }
                label={"Con imagen"}
            />

            {
                withImage &&
                <ImageUpload />
            }

            <TextField
                id="outlined-full-width"
                label="Texto"
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
                value={values.question}
            />
            <ChecbokList
                handleChange={handleChange}
                responses={values.options}
                handleResponse={handleResponse}
                markResponse={markResponse}
                deleteResponse={deleteResponse}
                aResponseWasMarkedAsCorrect={values.aResponseWasMarkedAsCorrect || props.asEdit}
                existTwoCompleteOptions={() => exitTwoCompleteOptions()}
            />
        </Container>

    </Dialog>
}