import { detailJobWeb, getListJobWeb } from '@controller';
import express from 'express';

export const jobRouter = express.Router();

jobRouter.get('/getListJob', getListJobWeb);
jobRouter.get('/detailJob', detailJobWeb);
