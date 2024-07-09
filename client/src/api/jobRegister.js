import { getData, postData } from '@lib/axios';

export const getListJobRegisterApi = (params) => getData('/admin/job-register/getListJobRegister', params);

export const getListJobRegisterWebApi = (params) => getData('/web/job-register/getListJobRegister', params);
export const addJobRegisterApi = (params) => postData('/web/job-register/addJobRegister', params, true);
export const cancelJobRegisterApi = (params) => postData('/web/job-register/cancelJobRegister', params);
