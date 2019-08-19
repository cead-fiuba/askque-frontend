import axios from 'axios';

export const SERVER_PATH = "http://localhost:3000/";

const token = localStorage.getItem('token')
const server = axios.create({
    baseURL: SERVER_PATH,
    headers: {
        'Authorization': token !== "null" ? token : null
    }
})

export default server;