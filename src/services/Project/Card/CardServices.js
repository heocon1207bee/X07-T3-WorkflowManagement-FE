import axiosInstance from '../../Axios/axiosInstance';
import { API_CARD, API_USER_PROJECTS } from '../../Axios/urlServerConfigure';

const CardServices = {
    create: (projectId, card) => axiosInstance.post(`${API_USER_PROJECTS}/${projectId}${API_CARD}`, card),
    getCard: (projectId) => axiosInstance.get(`${API_USER_PROJECTS}/${projectId}${API_CARD}`),
};

export default CardServices;
