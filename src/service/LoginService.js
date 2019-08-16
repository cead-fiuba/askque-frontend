import server from '../Server';

export const initSession = (userData) => {
    return server.post('/login', userData)
} 