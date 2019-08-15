import server from '../Server';

export const createTeacher = (teacher) => {
    return server.post('/teachers', teacher)
}

