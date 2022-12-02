import axios from 'axios';
import { getDataInLocal } from '../../utils/storeUser';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const STORE_KEY = process.env.REACT_APP_STORE_KEY;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*',
        Accept: 'application/x-www-form-urlencoded, text/plain',
    },
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const localStore = getDataInLocal(STORE_KEY);
        if (config.url.includes('/auth/token')) {
            const { token } = localStore;
            config.headers[ACCESS_TOKEN] = token;
            return config;
        }

        return config;
    },
    async (error) => {
        console.log(error);
        return Promise.reject(error);
    },
);

export default axiosInstance;
