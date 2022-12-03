import axios from 'axios';
import { getDataInLocal, saveToLocal } from '../../utils/storeUser';
import { AUTH_TOKEN, URL_NEED_TOKEN } from './urlServerConfigure';

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

const onRequest = (config) => {
    if (!URL_NEED_TOKEN.includes(config.url)) return config;
    const localStore = getDataInLocal(STORE_KEY);
    const { token } = localStore;
    config.headers[ACCESS_TOKEN] = token;
    return config;
};

const onRequestError = async (error) => Promise.reject(error);

const onReponse = (reponse) => reponse;

const onReponseError = async (error) => {
    if (error.response) {
        if (error.response.status === 401 && error.response.data.msg === 'jwt expired') {
            const localStore = getDataInLocal(STORE_KEY);
            const { session_token } = localStore;

            try {
                const rs = await axios.post(`$BASE_URL${AUTH_TOKEN}`, { session_token });
                const { token } = rs.data;
                saveToLocal(STORE_KEY, { token });

                return;
            } catch (err) {
                return Promise.reject(err);
            }
        }
    }

    return Promise.reject(error);
};

axiosInstance.interceptors.request.use(onRequest, onRequestError);
axiosInstance.interceptors.response.use(onReponse, onReponseError);

export default axiosInstance;
