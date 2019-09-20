import React, { useEffect, useState } from 'react'
import AppBar from "./AppBar"
import { getInformationOfQuestionary, getResultOfQuestionary } from '../service/TeacherService'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { HorizontalBar } from 'react-chartjs-2';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography } from '@material-ui/core';

const abecedario = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '8%'
    }
}));

export default function AskResults(props) {

    const classes = useStyles();

    const [loading, setLoading] = useState(true)
    const [questionary, setQuestionary] = useState()
    const [results, setResults] = useState()

    useEffect(() => {
        const informationPromise = getInformationOfQuestionary(props.match.params.hash)
        const resultPromise = getResultOfQuestionary(props.match.params.hash)
        Promise.all([informationPromise, resultPromise]).then((values) => {
            const [informationResponse, resultResponse] = values
            const information = informationResponse.data
            const result = resultResponse.data
            setResults(result)
            setQuestionary(information)
            setLoading(false)
        })
    }, [])


    const findCountOfOptionById = (optionId) => {
        const resultFiltered = results.filter(result => result.optionid === optionId)
        if (resultFiltered.length === 1) {
            const result = resultFiltered[0]
            return parseInt(result.count)
        }
        return 0
    }

    return <div>
        <AppBar
            position="static"
        />
        <Container maxWidth="md" component="main" className={classes.container}>
            {
                loading ? <>Obteniendo información</> :
                    <>
                        <>{questionary.name}</>
                        <>{questionary.questions.map((question, questionId) => {
                            const data = {
                                labels: question.options.map((option, idx) => abecedario[idx]),
                                datasets: [
                                    {
                                        label: `Pregunta ${questionId + 1}`,
                                        backgroundColor: 'rgba(255,99,132,0.2)',
                                        borderColor: 'rgba(255,99,132,1)',
                                        borderWidth: 1,
                                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                                        hoverBorderColor: 'rgba(255,99,132,1)',
                                        data: question.options.map((option) => findCountOfOptionById(option.id))
                                    }
                                ]
                            }

                            return <div
                                key={questionId}
                            >
                                <b>{question.text}</b>
                                <HorizontalBar data={data} width={200} height={50} />
                                <List>
                                    {
                                        questionary.questions.map((option, idx) => (
                                            <ListItem key={idx}>
                                                <ListItemText primary={
                                                    <Typography variant="body2">
                                                        {abecedario[idx] + " - " + option.text}
                                                    </Typography>
                                                } />
                                            </ListItem>
                                        ))
                                    }
                                </List>
                            </div>
                        })}
                        </>
                    </>
            }
        </Container>


    </div>
}