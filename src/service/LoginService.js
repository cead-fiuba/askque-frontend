import server from '../Server';

export const initSession = (email) => {

    return server.post('/login', {email}).then((res) => {
        const data = res.data;
        console.log('token', data)
        return Promise.resolve(data)
    }).catch((e) => {
        return Promise.reject(e)
    })
}