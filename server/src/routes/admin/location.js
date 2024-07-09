import { addLocation, detailLocation, getListLocation, updateLocation } from '@controller';
import express from 'express';

export const locationRouter = express.Router();

locationRouter.get('/getListLocation', getListLocation);
locationRouter.get('/detailLocation', detailLocation);
locationRouter.post('/addLocation', addLocation);
locationRouter.post('/updateLocation', updateLocation);
