import axiosInstance from '../Axios/axiosInstance';
import { AUTH_TOKEN, AUTH_LOGIN } from '../Axios/urlServerConfigure';

export default {
    login: (data) => {
        return axiosInstance.post(AUTH_LOGIN, data);
    },
    verifyToken: () => {
        return axiosInstance.get(AUTH_TOKEN);
    },
};
