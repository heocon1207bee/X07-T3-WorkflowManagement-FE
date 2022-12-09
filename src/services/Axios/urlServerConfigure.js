export const AUTH_TOKEN = '/auth/token';
export const AUTH_LOGIN = '/auth/login';
export const REGISTER = '/user';

//testing
export const PROJECT = '/projects';

//user/project
export const API_USER = '/user';
const API_PROJECTS = '/projects';
export const API_USER_PROJECTS = `${API_USER}${API_PROJECTS}`;

//authorization
export const URL_NEED_TOKEN = [AUTH_TOKEN, API_USER_PROJECTS];
