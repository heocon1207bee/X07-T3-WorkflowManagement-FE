import axiosInstance from '../Axios/axiosInstance';

export default {
    register: (data) => {
        return axiosInstance.post('/user', data);
    },
};
