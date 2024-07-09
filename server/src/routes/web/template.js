import { getListTemplateWeb } from '@controller';
import express from 'express';

export const templateRouter = express.Router();

templateRouter.get('/getListTemplate', getListTemplateWeb);
