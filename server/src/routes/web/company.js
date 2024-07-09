import { getListCompanyWeb } from '@controller';
import express from 'express';

export const companyRouter = express.Router();

companyRouter.get('/getListCompany', getListCompanyWeb);
