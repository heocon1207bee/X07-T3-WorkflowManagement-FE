import axiosInstance from '../Axios/axiosInstance';
import { REGISTER } from '../Axios/urlServerConfigure';
export default {
    register: (data) => {
        return axiosInstance.post(REGISTER, data);
    },
};
