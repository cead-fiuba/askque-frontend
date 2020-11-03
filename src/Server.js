import axios from 'axios';


//const SERVER_PATH = process.env.NODE_ENV === "production" ? "https://askque-back.herokuapp.com/" : "http://localhost:3000/";
const SERVER_PATH = "https://askque-back.herokuapp.com/"

console.log('process.env.NODE_ENV', process.env.NODE_ENV)
const server = axios.create({
    baseURL: SERVER_PATH,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
})

server.interceptors.request.use(
    config => {
        console.log('config.headers.Authorization', config.headers.Authorization)
        if (!config.headers.Authorization) {
            const token = localStorage.getItem('token')
            if (token !== "null") {
                config.headers.Authorization = token;
            }
        }
        return config;
    },
    error => Promise.reject(error)
);

export default server;