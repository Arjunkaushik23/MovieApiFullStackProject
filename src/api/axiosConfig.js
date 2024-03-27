import axios from 'axios';


const instance = axios.create({
  baseURL: 'https://61a2-2405-201-6828-5098-5e9-18c8-b4a2-9b69.ngrok-free.app',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'ngrok-skip-browser-warning': 'true',
  },
  withCredentials: true,
});

export default instance;