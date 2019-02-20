import { Router } from 'express';
import auth from '../../middlewares/auth';
import add from './methods/add';
import checkScript from './methods/check-script';
import remove from './methods/remove';
import edit from './methods/edit';
import list from './methods/list';
import single from './methods/single';
import stats from './methods/stats';
import top from './methods/top';
import count from './methods/count';
import browsers from './methods/browsers';
import events from './methods/events';

const router = Router();

router.get('/', auth, list);
router.post('/', auth, add);
router.get('/count', auth, count);
router.get('/:id', auth, single);
router.patch('/:id', auth, edit);
router.delete('/:id', auth, remove);
router.get('/:id/stats', auth, stats);
router.get('/:id/check', auth, checkScript);
router.get('/:id/top', auth, top);
router.get('/:id/browsers', auth, browsers);
router.get('/:id/events', auth, events);

export default router;
