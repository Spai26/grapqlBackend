import { isAuthentificate } from '@libs/apolloContext';

import { Router } from 'express';

const router = Router();

router.use('/', isAuthentificate, (req, res) => {});
export { router };
