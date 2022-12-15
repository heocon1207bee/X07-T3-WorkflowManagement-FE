import axios from 'axios';
import { API_USER_PROJECTS, AUTH_TOKEN, URL_NEED_TOKEN } from '../Axios/urlServerConfigure';
import { ACCESS_TOKEN, BASE_URL, STORE_KEY } from '../../configs/env';
import { getDataInLocal, saveToLocal } from '../../utils/storeUser';
import authenServices from '../Authen/authenServices';

const axiosInstance = axios.create({
    baseURL: "http://54.199.238.34:3001/api/v1",
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
            const { session_token, user } = localStore;

            try {
                const rs = await axios.post(`${BASE_URL}${AUTH_TOKEN}`, { user_id: user._id, session_token });
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

export default {
    getProject: async () => {
        const token = await JSON.parse(localStorage.getItem('worlflow_store')).token
        const config = {
            headers: { access_token: token }
        };
        return await axiosInstance.get(API_USER_PROJECTS, config);
    }
};
