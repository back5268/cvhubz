import express from 'express';
import { getListCategoryInfo, getListCompanyInfo, getListLocationInfo, getListUserInfo } from '@controller';

export const infoRouter = express.Router();

infoRouter.get('/getListUserInfo', getListUserInfo);
infoRouter.get('/getListCategoryInfo', getListCategoryInfo);
infoRouter.get('/getListLocationInfo', getListLocationInfo);
infoRouter.get('/getListCompanyInfo', getListCompanyInfo);
