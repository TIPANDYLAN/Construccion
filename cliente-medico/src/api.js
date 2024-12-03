// api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api', // Cambia esto si tu backend usa otro puerto
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
