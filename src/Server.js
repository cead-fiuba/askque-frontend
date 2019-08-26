import axios from 'axios';


const SERVER_PATH = process.env.NODE_ENV === "production" ? "https://askque-back.herokuapp.com/" : "http://localhost:3000/";

console.log('process.env.NODE_ENV', process.env.NODE_ENV)
const token = localStorage.getItem('token')
const server = axios.create({
    baseURL: SERVER_PATH,
    headers: {
        'Authorization': token !== "null" ? token : null
    }
})

export default server;