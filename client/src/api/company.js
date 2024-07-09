import { getData, postData } from '@lib/axios';

export const getListCompanyApi = (params) => getData('/admin/company/getListCompany', params);
export const deleteCompanyApi = (params) => postData('/admin/company/deleteCompany', params);
export const addCompanyApi = (params) => postData('/admin/company/addCompany', params, true);
export const updateCompanyApi = (params) => postData('/admin/company/updateCompany', params, true);
