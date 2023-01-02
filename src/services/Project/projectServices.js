import axiosInstance from '../Axios/axiosInstance';
import { API_USER_PROJECTS, AUTH_TOKEN } from '../Axios/urlServerConfigure';

export default {
    getProject: async () => {
        const token = await JSON.parse(localStorage.getItem('worlflow_store')).token;
        const config = {
            headers: { access_token: token },
        };
        return await axiosInstance.get(API_USER_PROJECTS, config);
    },
    getRole: async (projectId) => {
        const token = await JSON.parse(localStorage.getItem('worlflow_store')).token;
        const config = {
            headers: { access_token: token },
        }
        return await axiosInstance.get(`${API_USER_PROJECTS}/${projectId}/roles`, config)
    },
    addRole: async (projectId, roleName, capabilities) => {
        const token = await JSON.parse(localStorage.getItem('worlflow_store')).token;
        return await axiosInstance.post(`${API_USER_PROJECTS}/${projectId}/roles`, { roleName, capabilities })
    }
};
