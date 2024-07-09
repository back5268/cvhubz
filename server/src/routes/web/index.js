import express from 'express';
import { jobRouter } from './job';
import { companyRouter } from './company';
import { templateRouter } from './template';
import { jobRegisterRouter } from './jobRegister';

export const webRouter = express.Router();
webRouter.use('/job', jobRouter);
webRouter.use('/company', companyRouter);
webRouter.use('/template', templateRouter);
webRouter.use('/job-register', jobRegisterRouter);