import { addJob, deleteJob, detailJob, getListJob, updateJob } from '@controller';
import { upload } from '@lib/multer';
import express from 'express';

export const jobRouter = express.Router();

jobRouter.get('/getListJob', getListJob);
jobRouter.get('/detailJob', detailJob);
jobRouter.post('/deleteJob', deleteJob);
jobRouter.post('/addJob', upload.single('avatar'), addJob);
jobRouter.post('/updateJob', upload.single('avatar'), updateJob);
