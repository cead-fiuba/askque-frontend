import server from '../Server';

export const createTeacher = (teacher) => {
    return server.post('/teachers', teacher).then((res) => {
        const token = res.data.token
        console.log('token', token)
        server.defaults.headers.common['Authorization'] = token
        return Promise.resolve(res)
    }).catch((error) => {
        return Promise.reject(error)
    })
}


export const getAskquesOfTeacher = () => {
    return server.get('/questionaries')
}

export const getInformationOfQuestionary = (hash) => {
    return server.get(`/questionaries/${hash}`)
}

export const saveQuestionary = (questionary) => {
    console.log('questionary', questionary)
    return server.post('/questionaries', questionary)
}

export const getResultOfQuestionary = (hash) => {
    console.log(`Get result of questionary ${hash}`)
    return server.get(`/responses/questionaries/${hash}`)
}

