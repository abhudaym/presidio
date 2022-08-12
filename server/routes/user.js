import { Router } from 'express'
import { authUser, registerUser } from '../controllers/user.js';

const router = Router();

router.post('/login', authUser);
router.post('/register', registerUser)

export default router;
