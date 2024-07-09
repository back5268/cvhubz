import { getData, postData } from '@lib/axios';

export const getListLocationApi = (params) => getData('/admin/location/getListLocation', params);
export const deleteLocationApi = (params) => postData('/admin/location/deleteLocation', params);
export const addLocationApi = (params) => postData('/admin/location/addLocation', params);
export const updateLocationApi = (params) => postData('/admin/location/updateLocation', params);
