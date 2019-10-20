import React, { useEffect, useState } from 'react'
import AppBar from "./AppBar"
import { getInformationOfQuestionaryWithCache, getResultOfQuestionary } from '../service/TeacherService'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography } from '@material-ui/core';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

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
        const informationPromise = getInformationOfQuestionaryWithCache(props.match.params.hash);
        const resultPromise = getResultOfQuestionary(props.match.params.hash);

        Promise.all([informationPromise, resultPromise]).then(([informationResponse, resultResponse]) => {
            const information = informationResponse.data
            const results = resultResponse.data
            setQuestionary(information)
            setResults(results)
            setLoading(false)
        })

        const interval = setInterval(() => {
            const resultPromise = getResultOfQuestionary(props.match.params.hash)
            resultPromise.then((resultResponse) => {
                const result = resultResponse.data
                setResults(result)
                setLoading(false)
            })
        }, 10000);
        return () => clearInterval(interval);

    }, [props.match.params.hash])


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
                        <Typography variant="h3" style={{ marginBottom: '5%' }}>{questionary.name}</Typography>
                        <>{questionary.questions.map((question, questionId) => {
                            const data = question.options.map((option, idx) => {
                                return {
                                    name: abecedario[idx],
                                    cantidad: findCountOfOptionById(option.id)
                                }
                            })

                            return <div
                                key={questionId}
                            >
                                <b style={{ margin: '5%' }}>{question.text}</b>
                                <BarChart
                                    width={600}
                                    height={300}
                                    data={data}
                                    margin={{ top: 30, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="cantidad" fill="#8884d8" />
                                </BarChart>
                                <List>
                                    {
                                        question.options.map((option, idx) => {
                                            const message = option.correct ? 'Correcto' : 'Incorrecto'
                                            return <ListItem key={idx}>
                                                <ListItemText primary={
                                                    <Typography variant="body2">
                                                        {abecedario[idx] + " - " + option.text} <b>{message}</b>

                                                    </Typography>
                                                } />
                                            </ListItem>
                                        })
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