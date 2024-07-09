import { getData, postData } from '@lib/axios';

export const getListJobApi = (params) => getData('/admin/Job/getListJob', params);
export const deleteJobApi = (params) => postData('/admin/Job/deleteJob', params);
export const addJobApi = (params) => postData('/admin/Job/addJob', params, true);
export const updateJobApi = (params) => postData('/admin/Job/updateJob', params, true);

export const getListJobWebApi = (params) => getData('/web/Job/getListJob', params);
export const detailJobWebApi = (params) => getData('/web/Job/detailJob', params);
