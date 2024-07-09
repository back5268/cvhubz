import { addJobRegister, cancelJobRegister, getListJobRegisterWeb } from '@controller';
import { upload } from '@lib/multer';
import { authMiddleware } from '@middleware';
import express from 'express';

export const jobRegisterRouter = express.Router();
jobRegisterRouter.get('/getListJobRegister', getListJobRegisterWeb);
jobRegisterRouter.post('/addJobRegister', authMiddleware, upload.single('file'), addJobRegister);
jobRegisterRouter.post('/cancelJobRegister', authMiddleware, cancelJobRegister);
