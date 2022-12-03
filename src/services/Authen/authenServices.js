import { getDataInLocal } from '../../utils/storeUser';
import axiosInstance from '../Axios/axiosInstance';
import { AUTH_TOKEN, AUTH_LOGIN } from '../Axios/urlServerConfigure';

const STORE_KEY = process.env.REACT_APP_STORE_KEY;

export default {
    login: (data) => {
        return axiosInstance.post(AUTH_LOGIN, data);
    },
    verifyToken: () => {
        return axiosInstance.get(AUTH_TOKEN);
    },
    renewToken: () => {
        const localStore = getDataInLocal(STORE_KEY);
        const { session_token, user } = localStore;
        const { _id } = user;
        return axiosInstance.post(AUTH_TOKEN, { user_id: _id, session_token });
    },
};
