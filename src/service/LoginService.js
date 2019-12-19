import server from '../Server';

export const initSessionStudent = (userData) => {
    return server.post('/login/student', userData).then((res) => {
        const data = res.data;

        console.log('token', data)
        return Promise.resolve(data)
    }).catch((e) => {
        return Promise.reject(e)
    })
}

export const initSessionTeacher = (email) => {
    return server.post('/login/teacher', { email: email }).then((res) => {
        const data = res.data;
        console.log('res.data.token', data);
        console.log('Aaaaaaa', data);
        return Promise.resolve(data)
    }).catch((error) => {
        return Promise.reject(error)
    });
}