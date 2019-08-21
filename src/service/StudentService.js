import server from '../Server';

export const createStudent = (request) => {
    return server.post('/students', request)
}

export const getInformationOfQuestionary = (hash) => {
    return server.get(`/questionaries/${hash}`)
}