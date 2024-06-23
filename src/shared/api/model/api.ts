import axios from 'axios';

// юрл не должен заканчиваться на /
const API_URL = '';

export const api = axios.create({
    baseURL: API_URL,
});
