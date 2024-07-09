import express from 'express';
import { userRouter } from './user';
import { authMiddleware } from '@middleware';
import { companyRouter } from './company';
import { categoryRouter } from './category';
import { locationRouter } from './location';
import { templateRouter } from './template';
import { jobRouter } from './job';
import { jobRegisterRouter } from './jobRegister';

export const adminRouter = express.Router();

adminRouter.use(authMiddleware);
adminRouter.use('/user', userRouter);
adminRouter.use('/company', companyRouter);
adminRouter.use('/category', categoryRouter);
adminRouter.use('/location', locationRouter);
adminRouter.use('/template', templateRouter);
adminRouter.use('/job', jobRouter);
adminRouter.use('/job-register', jobRegisterRouter);
