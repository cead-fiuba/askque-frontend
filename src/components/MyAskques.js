import React, { useState, useEffect } from 'react';
import AppBar from "./AppBar"
import { makeStyles } from '@material-ui/core/styles';
import AskqueResume from "./AskqueResume"
import { getAskquesOfTeacher } from '../service/TeacherService'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Send } from 'mdi-material-ui'
import { ShowResult } from "./ShowResult"
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    leftIcon: {
        marginRight: theme.spacing(1)
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '8%'
    },
    createAskque: {
        marginTop: theme.spacing(2)
    },
    gridList: {
        width: 500,
        height: 450,
    }
}));



export default function MyAskques(props) {
    const classes = useStyles();
    const [values, setState] = useState({
        questionaries: [],
        errorHappen: false,
        showQuestionaryResult: false,
        questionaryHash: null,
        questionarySelected: null
    })


    function redirectTo(newPath) {
        props.history.push(newPath);
    }

    useEffect(() => {
        console.log('useEffect')
        getAskquesOfTeacher().then((res) => {
            setState({ ...values, questionaries: res.data.questionaries })
        }).catch((e) => {
            console.log(e)
            setState({ ...values, errorHappen: true })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return <div>
        <AppBar
            position="static"
        />
        <Container maxWidth="md" component="main" className={classes.container}>
            {
                values.showQuestionaryResult ?
                    <ShowResult
                        questionary={values.questionarySelected}
                    />
                    :
                    values.questionaries.length === 0 ?
                        <>
                            Ups! Todavia no creaste ningun askque!
                            No te preocupes, es muy fácil!

                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                className={classes.createAskque}
                                onClick={() => { redirectTo("/create-questionary") }}
                            >
                                <Send className={classes.leftIcon} />
                                Crear AskQue
                            </Button>
                        </>
                        :
                        <Grid container spacing={10}>
                            {
                                values.questionaries.map((questionary) => (
                                    <AskqueResume
                                        key={questionary.hash}
                                        code={questionary.hash}
                                        name={questionary.name}
                                        module={questionary.module}
                                        creationDate={questionary.date}
                                        onClick={() => redirectTo("/ask-results/" + questionary.hash)}
                                    />
                                ))}
                        </Grid>

            }
        </Container >
    </div >
}
