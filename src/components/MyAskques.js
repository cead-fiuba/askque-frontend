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
import TextField from '@material-ui/core/TextField';

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
        deleteQuestionaryByHash(hash).then((response) => {
            console.log('Se eliminó de manera correcta el cuestionario')
            console.log('response.data', response.data)
            setSnackBarConfig({ state: 'success', message: `Se eliminó el questionario ${response.data.hash}`, show: true })
        }).catch((reason) => {
            setSnackBarConfig({ state: 'error', message: 'No se pudo eliminar el questionario', show: true })

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
                        title={<Typography variant="h5" gutterBottom>Eliminar cuestionario</Typography>}
                        content={
                            <>
                                <Typography variant="body1" gutterBottom>
                                    ¿Está seguro que desea eliminar el cuestionario <b>{questionaryToDelete}</b>?
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Eliminar el cuestionario, implica borrar todos los resultados de la encuesta.
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
