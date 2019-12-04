import React from 'react'
import AppBar from "./AppBar"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '8%'
    }
}));

const AnswerOfQuestionaryView = (props) => {

    const questionaryHash = props.match.params.hash

    const styles = useStyles();

    return <>
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
                ResponseOfQuestionaryView {questionaryHash}
            </Grid>
        </Container>

    </>
}





export default AnswerOfQuestionaryView;