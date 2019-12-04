import React, { useState, useEffect } from 'react';
import AppBar from "./AppBar"
import { getResponseOfStudent } from '../service/ResponseService'
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ResponseCard from './ResponseCard'


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '8%'
    },
    loadingMessage: {
        marginTop: theme.spacing(3)
    }
}));

const MyAnswersView = () => {


    const [myAnswers, setMyAnswers] = useState({})
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        fetchMyAnswers(setMyAnswers, setLoading);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchMyAnswers])


    const styles = useStyles();
    return <div>
        <AppBar
            position="static"
        />
        <Container maxWidth="sm" component="main" className={styles.container}>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
            >
                {
                    loading ?
                        <>
                            <CircularProgress thickness={5.0} />
                            <div className={styles.loadingMessage}>
                                Obteniendo tus respuestas...
                        </div>
                        </> :
                        <>
                            {
                                myAnswers.map((answer, idx) => (
                                    <ResponseCard
                                        answer={answer}
                                        key={idx}
                                    />
                                ))
                            }
                        </>
                }

            </Grid>
        </Container>

    </div>
}

export default MyAnswersView;

function fetchMyAnswers(setMyAnswers, setLoading) {
    getResponseOfStudent().then((response) => {
        console.log('set');
        const answers = response.data.answers;
        setMyAnswers(answers);
        setLoading(false);
    });
}
