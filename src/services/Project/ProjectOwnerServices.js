import axiosInstance from '../Axios/axiosInstance';

import { API_USER_PROJECTS } from '../Axios/urlServerConfigure';

const create = (projects) => {
    return axiosInstance.post(API_USER_PROJECTS, projects);
};

const getDetail = (projectId) => {
    return axiosInstance.get(`${API_USER_PROJECTS}/${projectId}`);
};

export default {
    create,
    getDetail,
};
