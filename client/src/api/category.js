import { getData, postData } from '@lib/axios';

export const getListCategoryApi = (params) => getData('/admin/category/getListCategory', params);
export const deleteCategoryApi = (params) => postData('/admin/category/deleteCategory', params);
export const addCategoryApi = (params) => postData('/admin/category/addCategory', params);
export const updateCategoryApi = (params) => postData('/admin/category/updateCategory', params);
