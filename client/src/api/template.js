import { getData, postData } from '@lib/axios';

export const getListTemplateApi = (params) => getData('/admin/Template/getListTemplate', params);
export const deleteTemplateApi = (params) => postData('/admin/Template/deleteTemplate', params);
export const addTemplateApi = (params) => postData('/admin/Template/addTemplate', params, true);
export const updateTemplateApi = (params) => postData('/admin/Template/updateTemplate', params, true);

export const getListTemplateWebApi = (params) => getData('/web/Template/getListTemplate', params);
