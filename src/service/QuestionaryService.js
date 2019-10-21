import server from '../Server';

export const getInformationOfQuestionaryWithCache = (hash) => {
    return server.get(`/questionaries/${hash}?cache=true`)
}

export const getInformationOfQuestionary = (hash) => {
    return server.get(`/questionaries/${hash}`)
}