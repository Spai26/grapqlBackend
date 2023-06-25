import express, { Router } from 'express';
import resourceRoute from './resource.route';
import path from 'path';

const apiRoute = Router();
apiRoute.use('/resource', resourceRoute);
apiRoute.use('/storage', express.static(path.resolve('storage')));

export default apiRoute;
