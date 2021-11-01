import express from 'express';

import dolarPrice from './dolarPrice/dolarPrice.route';
import platforms from './platforms/platforms.route';

const router = express();

router.use('/dolar-price', dolarPrice);
router.use('/platforms', platforms);

export default router;