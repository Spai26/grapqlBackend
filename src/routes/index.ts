import { Router } from 'express';
import { upload } from '@libs/multerStorage';

import { showImage, uploadImage } from '@controllers/image.controller';

const apiRoute = Router();

apiRoute.post('/images', upload, uploadImage);
apiRoute.get('/images', showImage);

export default apiRoute;
