import { Router } from 'express';
import controller from './dolarPrice.controller';

const router = Router();

router.get('/get', controller.get);
router.post('/create', controller.create);
router.get('/testing-scraping', controller.testingScraping);

export default router;