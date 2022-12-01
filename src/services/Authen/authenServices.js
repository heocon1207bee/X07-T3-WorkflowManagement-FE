import axiosInstance from '../Axios/axiosInstance';

export default {
    login: (data) => {
        return axiosInstance.post('/auth/login', data);
    },
};
