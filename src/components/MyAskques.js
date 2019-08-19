import React, { useState, useEffect } from 'react';
import AppBar from "./AppBar"
import { makeStyles } from '@material-ui/core/styles';
import AskqueResume from "./AskqueResume"
import { getAskquesOfTeacher } from '../service/TeacherService'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Send } from 'mdi-material-ui'
import CssBaseline from '@material-ui/core/CssBaseline';


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
        marginTop: theme.spacing(10)
    },
    createAskque: {
        marginTop: theme.spacing(2)
    }
}));



export default function MyAskques(props) {
    const classes = useStyles();
    const [values, setState] = useState({
        questionaries: [],
        errorHappen: false
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
        <CssBaseline />
        <Container maxWidth="sm" component="main" className={classes.container}>
            {
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
                    values.questionaries.map((questionary) => (
                        <AskqueResume
                            code='W58H'
                        />
                    ))
            }
        </Container >
    </div >
}
