import axiosInstance from '../Axios/axiosInstance';
import { REGISTER } from '../Axios/urlServerConfigure';
export default {
    register: (data) => {
        return axiosInstance.post(REGISTER, data);
    },
    getUserData: async () => {
        return await axiosInstance.get(`${REGISTER}/profile`)
    },
    updateUserData: async (data) => {
        return await axiosInstance.put(`${REGISTER}/profile`, data)
    }
};
