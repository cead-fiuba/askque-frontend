import server from '../Server';

export const initSession = (userData) => {
    return server.post('/login', userData).then((res) => {
        const token = res.data.token
        server.defaults.headers.common['Authorization'] = token
        return Promise.resolve(token)
    }).catch((e) => {
        return Promise.reject(e)
    })
} 