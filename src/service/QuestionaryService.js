import server from '../Server';

export const getInformationOfQuestionaryWithCache = (hash) => {
    return server.get(`/questionaries/${hash}?cache=true`)
}

export const getInformationOfQuestionary = (hash) => {
    return server.get(`/questionaries/${hash}`)
}


export const updateQuantityResponses = (hash) => {
    return server.put(`/questionaries/${hash}/increment`)
}

export const showResultsOfQuestionary = (hash) => {
    return server.put(`/questionaries/${hash}/show_results`)
}

export const deleteQuestion = (questionId) => {
    return server.delete(`/questions/${questionId}`)
}