import axiosInstance from '../Axios/axiosInstance';

import { API_USER_PROJECTS } from '../Axios/urlServerConfigure';

const create = (projects) => {
    return axiosInstance.post(API_USER_PROJECTS, projects);
};

const getDetail = (projectId) => {
    return axiosInstance.get(`${API_USER_PROJECTS}/${projectId}`);
};

const update = (projectId, data) => {
    return axiosInstance.put(`${API_USER_PROJECTS}/${projectId}`, data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    create,
    getDetail,
    update,
};
