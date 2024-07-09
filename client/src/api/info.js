import { getData } from '@lib/axios';

export const getListCategoryInfoApi = (params) => getData('/info/getListCategoryInfo', params);
export const getListLocationInfoApi = (params) => getData('/info/getListLocationInfo', params);
export const getListCompanyInfoApi = (params) => getData('/info/getListCompanyInfo', params);
