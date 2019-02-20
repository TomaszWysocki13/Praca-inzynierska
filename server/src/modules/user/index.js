import { Router } from 'express';
import auth from '../../middlewares/auth';
import login from './methods/login';
import register from './methods/register';
import account from './methods/account';
import edit from './methods/edit';

const router = Router();

router.get('/', auth, account);
router.post('/login', login);
router.post('/register', register);
router.patch('/', auth, edit);

export default router;
