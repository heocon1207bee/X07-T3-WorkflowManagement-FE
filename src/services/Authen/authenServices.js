import { getDataInLocal } from '../../utils/storeUser';
import axiosInstance from '../Axios/axiosInstance';

const STORE_KEY = process.env.REACT_APP_STORE_KEY;

export default {
    login: (data) => {
        return axiosInstance.post('/auth/login', data);
    },
    verifyToken: () => {
        return axiosInstance.get('/auth/token');
    },
    renewToken: () => {
        const localStore = getDataInLocal(STORE_KEY);
        const { session_token, user } = localStore;
        const { _id } = user;
        return axiosInstance.post('/auth/token', { user_id: _id, session_token });
    },
};
