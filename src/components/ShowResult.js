
import React, { useEffect, useState } from 'react';
import { getResultOfQuestionary } from '../service/TeacherService'
import { HorizontalBar } from 'react-chartjs-2';


const abecedario = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]

export function ShowResult(props) {

    const [showResult, setShowResult] = useState(false)

    const [results, setResults] = useState([])


    useEffect(() => {
        getResultOfQuestionary(props.questionary.hash).then((response => {
            setResults(response.data)
            setShowResult(true)
        })).catch((reason) => {
            console.log('no se pudo obtener la informacion')
        })
    }, [])

    const findCountOfOptionById = (optionId) => {
        console.log('results', results)
        const resultFiltered = results.filter(result => result.optionid === optionId)
        if (resultFiltered.length === 1) {
            const result = resultFiltered[0]
            return parseInt(result.count)
        }
        return 0
    }

    return <>
        {

            showResult ?
                props.questionary.questions.map((question, questionId) => {
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
                    };
                    console.log('data', data)

                    return <div
                        key={questionId}
                    >
                        <b>{question.text}</b>
                        <HorizontalBar data={data} />
                    </div>

                }) :
                <div>Obteniendo la informacion</div>
        }
    </>
}