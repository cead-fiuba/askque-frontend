import server from '../Server';

export const createStudent = (request) => {
    return server.post('/students', request)
}