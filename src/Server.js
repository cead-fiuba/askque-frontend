import axios from 'axios';

export const SERVER_PATH = "http://localhost:3000/";

const server = axios.create({
    baseURL: SERVER_PATH
})

export default server;