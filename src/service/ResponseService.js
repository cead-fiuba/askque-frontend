import server from '../Server';


export const saveResponse = (response) => {
    return server.post('/responses', response)
}

export const getResultOfQuestionary = (hash) => {
    console.log(`Get result of questionary ${hash}`)
    return server.get(`/responses/questionaries/${hash}`)
}

export const deleteQuestionaryResponses = (hash) => {
    console.log(`Delete responses of questionary ${hash}`)
    return server.delete(`/responses/questionaries/${hash}`)
}


export const getResponseOfStudent = () => {
    console.log('Get responses of student')
    return server.get('/responses')
}