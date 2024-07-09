import {addCompany, deleteCompany, detailCompany, getListCompany, updateCompany} from '@controller';
import { upload } from '@lib/multer';
import express from 'express';
import {categoryRouter} from "./category";

export const companyRouter = express.Router();

companyRouter.get('/getListCompany', getListCompany);
companyRouter.get('/detailCompany', detailCompany);
categoryRouter.post('/deleteCompany', deleteCompany);
companyRouter.post('/addCompany', upload.single('avatar'), addCompany);
companyRouter.post('/updateCompany', upload.single('avatar'), updateCompany);
