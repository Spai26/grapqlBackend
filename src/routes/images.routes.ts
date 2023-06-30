import { showImage, uploadImage } from '@controllers/image.controller';
import { upload } from '@libs/multerStorage';

import { Router } from 'express';

const router = Router();
router.post('/', upload, uploadImage);
router.get('/', showImage);

export { router };
