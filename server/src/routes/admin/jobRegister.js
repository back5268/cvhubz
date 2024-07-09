import { getListJobRegister } from '@controller';
import express from 'express';

export const jobRegisterRouter = express.Router();

jobRegisterRouter.get('/getListJobRegister', getListJobRegister);
