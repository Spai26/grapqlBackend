import { Router } from 'express';

const apiRoute = Router();

apiRoute.use('/', (req, res) => {
  res.send('this page for api rest :) ');
});

export default apiRoute;
