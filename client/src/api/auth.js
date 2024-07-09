import { getData, postData } from '@lib/axios';

export const getInfoApi = (params) => getData('/auth/getInfo', params);
export const signinApi = (params) => postData('/auth/signin', params);
export const signinGoogleApi = (params) => postData('/auth/google', params);
export const signupApi = (params) => postData('/auth/signup', params);
