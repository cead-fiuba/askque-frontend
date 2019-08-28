import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import SendIcon from '@material-ui/icons/Send';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { saveResponse } from '../service/StudentService'


const useStyles = makeStyles(theme => ({
    text: {
        padding: theme.spacing(2, 2, 0),
    },
    paper: {
        paddingBottom: 50,
    },
    list: {
        marginBottom: theme.spacing(2),
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    grow: {
        flexGrow: 1,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
    root: {
        padding: theme.spacing(3)
    }
}));

export default function CompleteQuestionary(props) {
    const classes = useStyles();

    const [checked, setChecked] = useState([]);
    const [questionIdsMarked, setQuestionIdsMarked] = useState(new Set())
    const [showSendButton, setShowSendButton] = useState(false)


    function eqSet(as, bs) {
        if (as.size !== bs.size) return false;
        for (var a of as) if (!bs.has(a)) return false;
        return true;
    }

    const handleToggle = (value, questionId) => () => {
        const currentIndex = checked.indexOf(value.id);
        const newChecked = [...checked];
        const questionIdsMarkedNew = new Set(questionIdsMarked)
        questionIdsMarkedNew.add(questionId)
        setQuestionIdsMarked(questionIdsMarkedNew)

        if (currentIndex === -1) {
            newChecked.push(value.id);
            const allQuestionsSet = new Set(props.questionary.questions.map((question) => (question.id)))
            setShowSendButton(eqSet(allQuestionsSet, questionIdsMarkedNew))
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const createQuestionIdByOptionId = () => {
        const questionIdByOptionId = {}
        props.questionary.questions.forEach(question => {
            question.options.forEach((option) => {
                questionIdByOptionId[option.id] = question.id
            })
        });
        return questionIdByOptionId;
    }

    const sendResponse = () => {
        const questionIdByOptionId = createQuestionIdByOptionId()
        const response = {
            questionaryHash: props.questionary.hash,
            responses: checked.map((optionId) => (
                {
                    optionId: optionId,
                    questionId: questionIdByOptionId[optionId]
                }
            ))
        }
        saveResponse(response)
    }

    const createOptions = (options, questionId) => {
        return options.map((option) => (
            <ListItem key={option.id} role={undefined} dense button onClick={handleToggle(option, questionId)}>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={checked.indexOf(option.id) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': option.id }}
                    />
                </ListItemIcon>
                <ListItemText id={option.id} primary={option.text} />
            </ListItem>
        ))
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Paper square className={classes.paper}>
                {/* <List className={classes.list}>
                    {messages.map(({ id, questionText, options }) => (
                        <React.Fragment key={id}>
                            {id === 1 && <ListSubheader className={classes.subheader}>Today</ListSubheader>}
                            {id === 3 && <ListSubheader className={classes.subheader}><b>Yesterday</b></ListSubheader>}
                            <ListItem button>
                                <ListItemText primary={questionText} options={createOptions(options)} />
                            </ListItem>
                        </React.Fragment>
                    ))}
                </List> */}
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="flex-start"
                    className={classes.root}
                >

                    {props.questionary.questions.map(({ id, text, options }) => (
                        <Grid
                            item
                            key={id}
                        >

                            <Typography variant="body2" gutterBottom>
                                <b> {text} </b>
                            </Typography>
                            <List className={classes.list}>
                                {createOptions(options, id)}
                            </List>
                        </Grid>
                    ))}

                </Grid>
            </Paper>
            <AppBar position="fixed" color="primary" className={classes.appBar}>

                <Toolbar>
                    {showSendButton ?
                        <Fab
                            color="secondary"
                            aria-label="add"
                            className={classes.fabButton}
                            onClick={sendResponse}>
                            <SendIcon />
                        </Fab> :
                        <b>Asegurate de marcar alguna opcion cada pregunta</b>
                    }
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}
