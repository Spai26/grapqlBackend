import { uploadsImage } from '@controllers/resourceImageUpdoad';
import { upload, arrayUpload } from '@config/multerStorage';
import { Router } from 'express';

const resourceRoute = Router();

resourceRoute.route('/uploads').post();

export default resourceRoute;
