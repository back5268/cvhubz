import { addJob, deleteJob, detailJob, getListJob, updateJob } from '@controller';
import express from 'express';

export const jobRouter = express.Router();

jobRouter.get('/getListJob', getListJob);
jobRouter.get('/detailJob', detailJob);
jobRouter.post('/deleteJob', deleteJob);
jobRouter.post('/addJob', addJob);
jobRouter.post('/updateJob', updateJob);
