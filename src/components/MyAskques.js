import React, { useState, useEffect } from 'react';
import AppBar from "./AppBar"
import { makeStyles } from '@material-ui/core/styles';
import AskqueResume from "./AskqueResume"
import { getAskquesOfTeacher, deleteQuestionaryByHash } from '../service/TeacherService'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import CreateIcon from '@material-ui/icons/Add';
import { MySnackbarContentWrapper } from './common/MySnackbarContentWrapper'
import AlertDialog from './common/AlertDialog';
import Typography from '@material-ui/core/Typography';
import { useSnackbar, SnackbarProvider } from 'notistack';
import { deleteQuestionaryResponses } from '../service/ResponseService';

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



export function MyAskques2(props) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const [values, setState] = useState({
        questionaries: [],
        errorHappen: false,
        questionaryHash: null,
        questionarySelected: null
    })

    const [snackBarConfig, setSnackBarConfig] = useState({})
    const [loading, setLoading] = useState(true)
    const [showAlertDialog, setShowAlertDialog] = useState(false)
    const [questionaryToDelete, setQuestionaryToDelete] = useState('')


    function redirectTo(newPath) {
        props.history.push(newPath);
    }

    useEffect(() => {
        console.log('useEffect')
        getAskquesOfTeacher().then((res) => {
            setState({ ...values, questionaries: res.data.questionaries })
            setLoading(false)
        }).catch((e) => {
            console.log(e)
            setState({ ...values, errorHappen: true })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [snackBarConfig])


    const deleteQuestionary = (hash) => {
        setShowAlertDialog(false)
        let variant = 'success'
        deleteQuestionaryByHash(hash)

            .then((value) => {
                enqueueSnackbar(`El cuestionario ${hash} fue eliminado`, { variant });
                setLoading(true)
                getAskquesOfTeacher().then((res) => {
                    setState({ ...values, questionaries: res.data.questionaries })
                    setLoading(false)
                })
            })
            .catch((reason) => {
                variant = 'error'
                enqueueSnackbar(`No se pudo eliminar el cuestionario ${hash}`, { variant });
            })
        deleteQuestionaryResponses(hash)
            .then((value) => {
                enqueueSnackbar(`Se eliminaron las respuestas del cuestionario ${hash}`, { variant });
            })
            .catch((reason) => {
                variant = 'error'
                enqueueSnackbar(`No se pudo eliminar las respuestas del cuestionario ${hash}`, { variant });
            })


    }

    const handleDeleteQuestionary = (hash) => {
        setQuestionaryToDelete(hash)
        setShowAlertDialog(true)
    }


    return <div>
        <AppBar
            position="static"
        />
        <Container maxWidth="md" component="main" className={classes.container}>
            {
                loading ? "Obteniendo información" : <>
                    {
                        values.questionaries.length === 0 ?
                            "Ups! No tenes ningún cuestionario creado.\n" +
                            "No te preocupes, es muy fácil!"

                            :
                            <Grid container spacing={10}>
                                {
                                    values.questionaries.map((questionary) => (
                                        <AskqueResume
                                            key={questionary.hash}
                                            code={questionary.hash}
                                            name={questionary.name}
                                            module={questionary.module}
                                            date={questionary.date}
                                            showQuestionaryResults={() => redirectTo("/ask-results/" + questionary.hash)}
                                            deleteQuestionary={() => handleDeleteQuestionary(questionary.hash)}
                                            editQuestionary={() => redirectTo(`edit-questionary/${questionary.hash}`)}
                                            showActions={true}
                                        />
                                    ))}
                            </Grid>

                    }
                    {
                        snackBarConfig.show && < MySnackbarContentWrapper
                            variant={snackBarConfig.state}
                            message={snackBarConfig.message}
                            open={snackBarConfig.show}
                            onClose={() => { setSnackBarConfig({ show: false }) }}
                        />
                    }

                    <Fab color="primary" style={{ margin: '10%' }} onClick={() => { redirectTo("/create-questionary") }}>
                        <CreateIcon />
                    </Fab>
                    <AlertDialog
                        open={showAlertDialog}
                        handleClose={() => { setShowAlertDialog(false) }}
                        title={"Eliminar cuestionario"}
                        content={
                            <>
                                <Typography variant="body1" gutterBottom component={'span'}>
                                    {"¿Está seguro que desea eliminar el cuestionario?\n"}
                                </Typography>
                            </>
                        }
                        buttonTextOk={<b>Eliminar</b>}
                        buttonTextCancel={<b>Cancelar</b>}
                        handleOk={() => { deleteQuestionary(questionaryToDelete) }}

                    />
                </>
            }
        </Container >
    </div >
}


export default function MyAskques(props) {
    return (<SnackbarProvider maxSnack={3}>
        <MyAskques2 {...props} />
    </SnackbarProvider>
    )
}