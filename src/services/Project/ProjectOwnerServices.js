import axiosInstance from '../Axios/axiosInstance';

import { API_USER_PROJECTS } from '../Axios/urlServerConfigure';

const createProject = (projects) => {
    return axiosInstance.post(API_USER_PROJECTS, projects);
};

export default {
    createProject,
};
