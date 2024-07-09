import { addTemplate, deleteTemplate, detailTemplate, getListTemplate, updateTemplate } from '@controller';
import { upload } from '@lib/multer';
import express from 'express';

export const templateRouter = express.Router();

templateRouter.get('/getListTemplate', getListTemplate);
templateRouter.get('/detailTemplate', detailTemplate);
templateRouter.post('/deleteTemplate', deleteTemplate);
templateRouter.post(
  '/addTemplate',
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'file', maxCount: 1 }
  ]),
  addTemplate
);
templateRouter.post(
  '/updateTemplate',
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'file', maxCount: 1 }
  ]),
  updateTemplate
);
