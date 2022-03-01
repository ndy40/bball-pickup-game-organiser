import axios from 'axios';
import { getToken } from './local-storage';

export default axios.create({
    baseURL: '/api',
    headers: {
        'x-api-key': getToken(),
    },
});
