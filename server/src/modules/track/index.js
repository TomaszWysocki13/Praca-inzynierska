import { Router } from 'express';
import auth from '../../middlewares/auth';
import event from './methods/event';
import count from './methods/count';

const router = Router();

router.get('/count', auth, count);
router.get('/:sid', event);

export default router;
