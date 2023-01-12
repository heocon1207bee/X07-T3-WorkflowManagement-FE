import axiosInstance from '../Axios/axiosInstance';
import { API_USER_PROJECTS, AUTH_TOKEN, API_INVITE } from '../Axios/urlServerConfigure';
import async from 'async';

export default {
    getProject: async () => {
        const token = await JSON.parse(localStorage.getItem('worlflow_store')).token;
        const config = {
            headers: { access_token: token },
        };
        return await axiosInstance.get(API_USER_PROJECTS, config);
    },
    getProjectInfo: async (projectId) => {
        return await axiosInstance.get(`${API_USER_PROJECTS}/${projectId}`);
    },
    getRole: async (projectId) => {
        const token = await JSON.parse(localStorage.getItem('worlflow_store')).token;
        const config = {
            headers: { access_token: token },
        }
        return await axiosInstance.get(`${API_USER_PROJECTS}/${projectId}/roles`, config);
    },
    addRole: async (projectId, roleName, capabilities) => {
        //const token = await JSON.parse(localStorage.getItem('worlflow_store')).token;
        return await axiosInstance.post(`${API_USER_PROJECTS}/${projectId}/roles`, { roleName, capabilities });
    },
    inviteMember: async (projectId, data) => {
        //const token = await JSON.parse(localStorage.getItem('worlflow_store')).token;
        return await axiosInstance.post(`${API_USER_PROJECTS}/${projectId}/invites`, data);
    },
    getInvitesList: async () => {
        //const token = await JSON.parse(localStorage.getItem('worlflow_store')).token;
        return await axiosInstance.get(`${API_USER_PROJECTS}${API_INVITE}`)
    },
    inviteResponse: async (projectId, data) => {
        return await axiosInstance.put(`${API_USER_PROJECTS}/${projectId}${API_INVITE}`, data);
    },
    changeMemberRole: async (projectId, data) => {
        return await axiosInstance.put(`${API_USER_PROJECTS}/${projectId}/member`, data);
    }
};
